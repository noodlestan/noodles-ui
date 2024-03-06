import { readdirSync, statSync } from 'fs';
import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';

import { ComponentResource, RenderedComponentResource } from '@noodles-ui/core-types';
import { ESLint } from 'eslint';
import prettier from 'prettier';
import ts from 'typescript';

import { formatFileNameRelativeToProject } from '../../cli/format/formatFileNameRelativeToProject';
import { logError } from '../../cli/functions/logError';
import { logSuccess } from '../../cli/functions/logSuccess';
import { ComponentContext, ProjectContext } from '../../types/projects';
import { tsFileHeader } from '../files/tsFileHeader';

import { componentGeneratedFileName } from './paths/componentGeneratedFileName';
import { exportComponent } from './statements/exportComponent';
import { exportComponentProps } from './statements/exportComponentProps';
import { importComponentStyles } from './statements/importComponentStyles';
import { importFrameworkComponent } from './statements/importFrameworkComponent';
import { importRenderedComponent } from './statements/importRenderedComponent';

async function findEslintConfig(project: ProjectContext, startDir: string) {
    const possibleConfigs = ['.eslintrc', '.eslintrc.js', '.eslintrc.cjs', '.eslintrc.json'];
    const foundConfigs: string[] = [];

    function search(dir: string) {
        const files = readdirSync(dir);
        for (const file of files) {
            const filePath = join(dir, file);
            const stat = statSync(filePath);
            if (!stat.isDirectory()) {
                if (possibleConfigs.includes(file)) {
                    foundConfigs.push(filePath);
                }
            }
        }
        if (dirname(dir).includes(project.rootPath || project.projectPath)) {
            search(dirname(dir));
        }
    }

    search(startDir);
    return foundConfigs;
}

const printTypescriptStatements = (statements: ts.Statement[]): string => {
    const resultFile = ts.createSourceFile(
        '',
        '',
        ts.ScriptTarget.Latest,
        /* setParentNodes */ false,
        ts.ScriptKind.TS,
    );
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const content = statements
        .map(statement => printer.printNode(ts.EmitHint.Unspecified, statement, resultFile))
        .join('\n');

    return content;
};

async function formatTypescriptFile(project: ProjectContext, fileName: string): Promise<boolean> {
    const configFiles = await findEslintConfig(project, dirname(fileName));
    if (!configFiles.length) {
        throw new Error(`Could not resolve ESLint config for "${fileName}".`);
    }
    // eslint-disable-next-line security/detect-non-literal-require
    const eslintConfig = await require(configFiles[0]);

    const eslintOptions = {
        useEslintrc: false,
        overrideConfig: eslintConfig,
        fix: true,
    };
    const linter = new ESLint(eslintOptions);
    const results = await linter.lintFiles([fileName]);
    await ESLint.outputFixes(results);

    if (results && results[0] && results[0].errorCount) {
        logError(
            'ESLint errors generating',
            formatFileNameRelativeToProject(project.build.modules, fileName),
        );
        const messages = results[0].messages.map(m => ({
            message: m.message,
            fileName,
            line: m.line,
            columun: m.column,
        }));
        const diagnosticData = {
            messages,
            sourceCode: results[0].output,
        };
        project.addDiagnostic(fileName, 'ESLint errors in generated code', diagnosticData);
        logError('ESLint options', eslintOptions);
        return false;
    }

    return true;
}

async function formatSourceCode(fileName: string, output: string) {
    const options = await prettier.resolveConfig(fileName);
    const formatted = await prettier.format(output, { ...options, parser: 'typescript' });
    return formatted;
}

export const generateComponentPrivate = async (
    project: ProjectContext,
    key: string,
    component: ComponentContext,
    instance: ComponentResource,
): Promise<void> => {
    const fileName = componentGeneratedFileName(project, instance);

    const rendered = instance.render as RenderedComponentResource;
    const statements = [
        importFrameworkComponent(),
        importRenderedComponent(rendered),
        importComponentStyles(instance),
        exportComponentProps(instance),
        exportComponent(instance),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCode(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    if (success) {
        logSuccess('generated', formatFileNameRelativeToProject(project.build.modules, fileName));
    } else {
        logError(
            'Error generating',
            formatFileNameRelativeToProject(project.build.modules, fileName),
        );
    }
};
