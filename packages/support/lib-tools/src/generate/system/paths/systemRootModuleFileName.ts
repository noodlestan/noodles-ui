import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { systemComponentName } from '../RootComponent/systemComponentName';

export const systemRootModuleFileName = (project: ProjectContext, target: string): string => {
    const componentName = systemComponentName(project);
    return join(target, `/providers/${componentName}/${componentName}.module.scss`);
};
