import { writeFile } from 'fs/promises';

import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir } from '../../../util/fs';
import { formatTypescriptFile } from '../../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../../prettier/formatSourceCodeWithPrettier';
import { importFrameworkTypes } from '../../targets/solid-js/importFrameworkTypes';
import { printTypescriptStatements } from '../../typescript/printTypescriptStatements';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentFileName } from '../paths/componentFileName';

import { declareRenderedProps } from './ComponentPrivate/declareRenderedProps';
import { exportComponent } from './ComponentPrivate/exportComponent';
import { exportComponentProps } from './ComponentPrivate/exportComponentProps';
import { exportDefaultValues } from './ComponentPrivate/exportDefaultValues';
import { importComponentStyles } from './ComponentPrivate/importComponentStyles';
import { importDefaultOptions } from './ComponentPrivate/importDefaultOptions';
import { importRenderedComponent } from './ComponentPrivate/importRenderedComponent';
import { importVariantTypes } from './ComponentPrivate/importVariantTypes';

export const generateComponentPrivate = async (
    project: ProjectContext,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const { entity } = component;
    const fileName = componentFileName(targetDir, entity);
    await ensuredFiledir(fileName);

    const importJSX = !!entity.props?.children;
    const statements = [
        importFrameworkTypes(importJSX),
        importRenderedComponent(component),
        ...importDefaultOptions(component, targetDir),
        ...importVariantTypes(component, targetDir),
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
