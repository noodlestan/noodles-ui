import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../types/projects';

import { logInfo } from './logInfo';
import { logMessage } from './logMessage';

export const logProjectResource = (
    project: ProjectContext,
    projectResource: ProjectResource,
): void => {
    logInfo(`project resources`);
    const { components, surfaces, themes, variants } = projectResource;
    for (const item of components) {
        logMessage('+ component', `${item.module}/${item.name}`);
    }
    for (const item of surfaces) {
        logMessage('+ surfaces', `${item.module}/${item.name}`);
    }
    for (const item of themes) {
        logMessage('+ themes', `${item.module}/${item.name}`);
    }
    for (const item of variants) {
        logMessage('+ variants', `${item.module}/${item.name}`);
    }
    console.info('');
};
