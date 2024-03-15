import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { loadComponents } from '../project/components/loadComponents';
import { loadSurfaces } from '../project/surfaces/loadSurfaces';
import { loadThemes } from '../project/themes/loadThemes';
import { loadTokens } from '../project/tokens/loadTokens';
import { loadVariants } from '../project/variants/loadVariants';

import { logInfo } from './logger/logInfo';
import { logMessage } from './logger/logMessage';

export const loadProject = (project: ProjectContext, resource: ProjectResource): void => {
    const { name, module } = resource;
    project.resource = { name, module };

    logInfo('loading project...');
    logMessage('  name:', name);
    logMessage('  module:', module);
    console.info('');

    logInfo('loading surfaces...');
    loadSurfaces(project, resource);
    console.info('');

    logInfo('loading themes...');
    loadThemes(project, resource);
    console.info('');

    logInfo('loading variants...');
    loadVariants(project, resource);
    console.info('');

    logInfo('loading components...');
    loadComponents(project, resource);
    console.info('');

    logInfo('loading tokens...');
    loadTokens(project, resource);
    console.info('');
};
