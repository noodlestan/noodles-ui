import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { getPublicComponents } from '@noodles-ui/core-entities';
import ts from 'typescript';

import { ensuredFiledir } from '../../util/ensuredFiledir';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { importFrameworkTypes } from '../targets/solid-js/importFrameworkTypes';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { declareLiveMap } from './ComponentsLiveMap/declareLiveMap';
import { importComponent } from './ComponentsLiveMap/importComponent';
import { componentsLiveMapFileName } from './paths/componentsLiveMapFileName';

const factory = ts.factory;

export const generateComponentsLiveMap = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const fileName = componentsLiveMapFileName(targetDir);
    await ensuredFiledir(fileName);

    const components = getPublicComponents(compiler);
    const importComponents = components.map(component => importComponent(component, targetDir));

    const exportDefault = factory.createExportAssignment(
        undefined,
        undefined,
        factory.createIdentifier('liveMap'),
    );

    const statements = [
        importFrameworkTypes(),
        ...importComponents,
        declareLiveMap(compiler),
        exportDefault,
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success });
};
