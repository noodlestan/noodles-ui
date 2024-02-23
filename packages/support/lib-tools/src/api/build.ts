import { join, resolve } from 'path';

import { ProjectResource } from '@noodles-ui/core-types';

import { logInfo } from '../cli/logInfo';
import { logMessage } from '../cli/logMessage';
import { logProjectBasicInfo } from '../cli/logProjectBasicInfo';
import { logSuccess } from '../cli/logSuccess';
import { stripFilename } from '../cli/stripFilename';
import { loadComponents } from '../project/components/loadComponents';
import { createProject } from '../project/createProject';
import { getProjectFilenamesWatchlist } from '../project/getProjectFilenamesWatchlist';
import { getProjectModules } from '../project/getProjectModules';
import { loadSurfaces } from '../project/surfaces/loadSurfaces';
import { loadThemes } from '../project/themes/loadThemes';
import { loadTokens } from '../project/tokens/loadTokens';
import { loadVariants } from '../project/variants/loadVariants';
import { NUI_BUILD_FILE } from '../resources/constants';

export const build = async (meta: ProjectResource): Promise<void> => {
    const projectFile = resolve(join('.', NUI_BUILD_FILE));
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const project = await createProject(projectFile);
    logProjectBasicInfo(project);
    logMessage('meta:', meta);

    const sources = getProjectFilenamesWatchlist(project);
    const modules = getProjectModules(project);

    logMessage('sources', sources);
    logMessage('modules', modules);

    loadSurfaces(project, meta);
    loadThemes(project, meta);
    loadVariants(project, meta);
    loadComponents(project, meta);
    loadTokens(project, meta);

    logInfo('> surfaces');
    console.info(project.surfaces.items);
    logInfo('> themes');
    console.info(project.themes.items);
    logInfo('> variants');
    console.info(project.variants.items);
    logInfo('> components');
    console.info(project.components.items);
    logInfo('> tokens');
    console.info(project.tokens.items);

    logSuccess('Build successful');
};
