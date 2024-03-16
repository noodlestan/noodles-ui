import { join } from 'path';

import { ComponentResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_GENERATED_FOLDER } from '../../constants';

import { componentScssModuleBaseName } from './componentScssModuleBaseName';

export const componentScssModuleFileName = (
    project: ProjectContext,
    entity: ComponentResource,
): string => {
    const baseName = componentScssModuleBaseName(entity);
    return join(project.projectPath, NUI_GENERATED_FOLDER, baseName);
};
