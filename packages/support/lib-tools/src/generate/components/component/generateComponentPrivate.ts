import { writeFile } from 'fs/promises';

import { ComponentContextWithInstance, ProjectContext } from '@noodles-ui/support-types';

import { formatTypescriptFile } from '../../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../../typescript/printTypescriptStatements';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentGeneratedFileName } from '../paths/componentGeneratedFileName';

import { declareRenderedProps } from './statements/declareRenderedProps';
import { exportComponent } from './statements/exportComponent';
import { exportComponentProps } from './statements/exportComponentProps';
import { exportDefaultValues } from './statements/exportDefaultValues';
import { importComponentStyles } from './statements/importComponentStyles';
import { importDefaultOptions } from './statements/importDefaultOptions';
import { importFrameworkComponent } from './statements/importFrameworkComponent';
import { importRenderedComponent } from './statements/importRenderedComponent';
import { importVariantTypes } from './statements/importVariantTypes';

export const generateComponentPrivate = async (
    project: ProjectContext,
    key: string,
    component: ComponentContextWithInstance,
): Promise<void> => {
    const { instance } = component;
    const fileName = componentGeneratedFileName(project, instance);

    const importJSX = !!instance.props?.children;

    const statements = [
        importFrameworkComponent(importJSX),
        importRenderedComponent(component),
        ...importDefaultOptions(component),
        ...importVariantTypes(component),
        importComponentStyles(component),
        ...exportDefaultValues(component),
        declareRenderedProps(project, component),
        exportComponentProps(project, component),
        exportComponent(component),
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};