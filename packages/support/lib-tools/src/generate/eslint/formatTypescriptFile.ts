import { dirname } from 'path';

import { ESLint } from 'eslint';

import { ProjectContext, ProjectDiagnosticFileError } from '../../types/projects';

import { findEslintConfig } from './findEslintConfig';

export const formatTypescriptFile = async (
    project: ProjectContext,
    fileName: string,
): Promise<boolean> => {
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
        results[0].messages.forEach(m => {
            const source: ProjectDiagnosticFileError = {
                fileName,
                line: m.line,
                column: m.column,
                sourceCode: results[0].output,
            };
            project.addDiagnostic(source, 'ESLint: ' + m.message, { eslintOptions });
        });
        return false;
    }

    return true;
};
