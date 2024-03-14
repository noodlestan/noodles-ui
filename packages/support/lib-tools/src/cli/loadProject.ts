import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { loadComponents } from '../project/components/loadComponents';
import { loadSurfaces } from '../project/surfaces/loadSurfaces';
import { loadThemes } from '../project/themes/loadThemes';
import { loadTokens } from '../project/tokens/loadTokens';
import { loadVariants } from '../project/variants/loadVariants';

import { logInfo } from './logger/logInfo';

export const loadProject = (project: ProjectContext, projectResource: ProjectResource): void => {
    logInfo('loading surfaces...');
    loadSurfaces(project, projectResource);
    console.info('');

    logInfo('loading themes...');
    loadThemes(project, projectResource);
    console.info('');

    logInfo('loading variants...');
    loadVariants(project, projectResource);
    console.info('');

    logInfo('loading components...');
    loadComponents(project, projectResource);
    console.info('');

    logInfo('loading tokens...');
    loadTokens(project, projectResource);
    console.info('');
};
