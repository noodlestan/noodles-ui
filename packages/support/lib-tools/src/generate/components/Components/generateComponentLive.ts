import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { ComponentBuildContext } from '@noodles-ui/core-entities';

import { ensureFileDir } from '../../../util/ensureFileDir';
import { formatTypescriptFile } from '../../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../../prettier/formatSourceCodeWithPrettier';
import { importFrameworkTypes } from '../../targets/solid-js/importFrameworkTypes';
import { printTypescriptStatements } from '../../typescript/printTypescriptStatements';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentLiveFileName } from '../paths/componentLiveFileName';

import { declareDefaultValues } from './ComponentDemo/declareDefaultValues';
import { declareDemoProps } from './ComponentDemo/declareDemoProps';
import { exportComponent } from './ComponentDemo/exportComponent';
import { importComponent } from './ComponentDemo/importComponent';

export const generateComponentLive = async (
    compiler: CompilerContext,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const { entity } = component;
    const fileName = componentLiveFileName(targetDir, entity);
    await ensureFileDir(fileName);

    const statements = [
        importFrameworkTypes(true),
        importComponent(component, fileName),
        declareDemoProps(component),
        declareDefaultValues(component),
        exportComponent(component),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(compiler, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success });
};
