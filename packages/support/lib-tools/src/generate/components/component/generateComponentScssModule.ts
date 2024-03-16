import { writeFile } from 'fs/promises';

import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentScssModuleFileName } from '../paths/componentScssModuleFileName';

export const generateComponentScssModule = async (
    project: ProjectContext,
    component: ComponentBuildContext,
): Promise<void> => {
    const { entity } = component;
    const name = entity.name;
    const fileName = componentScssModuleFileName(project, component.entity);

    const content = `.${name} { }`;
    const output = tsFileHeader(project, fileName) + content + '\n';
    await writeFile(fileName, output);

    project.addGeneratedSourceFile({ fileName, success: true });
};
