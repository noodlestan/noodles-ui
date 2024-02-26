import { join, resolve } from 'path';

import { ProjectResource } from '@noodles-ui/core-types';
import figlet from 'figlet';

import { logInfo } from '../cli/logInfo';
import { logMessage } from '../cli/logMessage';
import { logProjectBasicInfo } from '../cli/logProjectBasicInfo';
import { logProjectModules } from '../cli/logProjectModules';
import { logSuccess } from '../cli/logSuccess';
import { saveProjectModules } from '../cli/saveProjectModules';
import { stripFilename } from '../cli/stripFilename';
import { loadComponents } from '../project/components/loadComponents';
import { createProject } from '../project/createProject';
import { ensureProjectCacheDir } from '../project/ensureProjectCacheDir';
import { loadSurfaces } from '../project/surfaces/loadSurfaces';
import { loadThemes } from '../project/themes/loadThemes';
import { loadTokens } from '../project/tokens/loadTokens';
import { loadVariants } from '../project/variants/loadVariants';
import { NUI_BUILD_FILE } from '../resources/constants';

export const build = async (meta: ProjectResource): Promise<void> => {
    console.info(figlet.textSync('Noodles UI'));
    const projectFile = resolve(join('.', NUI_BUILD_FILE));
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const project = await createProject(projectFile);
    await ensureProjectCacheDir(project);
    logProjectBasicInfo(project);
    logMessage('meta:', meta);

    await saveProjectModules(project);
    logProjectModules(project);

    logInfo('loading surfaces...');
    loadSurfaces(project, meta);

    logInfo('loading themes...');
    loadThemes(project, meta);

    logInfo('loading variants...');
    loadVariants(project, meta);

    logInfo('loading components...');
    loadComponents(project, meta);

    logInfo('loading tokens...');
    loadTokens(project, meta);

    logSuccess('Build successful');

    logSuccess('surfaces', project.surfaces.items);
    logSuccess('themes', project.themes.items);
    logSuccess('variants', project.variants.items);
    logSuccess('components', project.components.items);
    logSuccess('tokens', project.tokens.items);

    logMessage('\\o/\n | \n/ \\');
};
