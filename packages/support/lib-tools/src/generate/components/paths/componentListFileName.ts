import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_GENERATED_FOLDER } from '../../constants';

export const componentListFileName = (project: ProjectContext): string => {
    return join(project.projectPath, `${NUI_GENERATED_FOLDER}/components.ts`);
};
