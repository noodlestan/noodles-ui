import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../build/types';
import { loadComponents } from '../project/resources/components/loadComponents';
import { loadSurfaces } from '../project/resources/surfaces/loadSurfaces';
import { loadThemes } from '../project/resources/themes/loadThemes';
import { loadTokens } from '../project/resources/tokens/loadTokens';
import { loadVariants } from '../project/resources/variants/loadVariants';

import { logInfo } from './logger/logInfo';
import { logMessage } from './logger/logMessage';

export const loadProject = (
    project: ProjectContext,
    resource: ProjectResource,
    options: BuildOptions,
): void => {
    const { name, module } = resource;
    project.resource = { name, module };

    logInfo('...loading project...');
    logMessage('  Name:', name);
    logMessage('  Module:', module);
    console.info('');

    logInfo('...loading surfaces...');
    loadSurfaces(project, resource);
    console.info('');

    logInfo('...loading variants...');
    loadVariants(project, resource);
    console.info('');

    logInfo('...loading components...');
    loadComponents(project, resource);
    console.info('');

    logInfo('...loading tokens...');
    loadTokens(project, resource);
    console.info('');

    logInfo('...loading themes...');
    loadThemes(project, resource, options);
    console.info('');
};
