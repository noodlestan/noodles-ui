import { join, resolve } from 'path';

import { ProjectResource } from '@noodles-ui/core-types';
import figlet from 'figlet';

import { logInfo } from '../cli/logInfo';
import { logMessage } from '../cli/logMessage';
import { logProjectBasicInfo } from '../cli/logProjectBasicInfo';
import { logProjectData } from '../cli/logProjectData';
import { logProjectModules } from '../cli/logProjectModules';
import { logProjectResource } from '../cli/logProjectResource';
import { logSuccess } from '../cli/logSuccess';
import { saveProjectModules } from '../cli/saveProjectModules';
import { stripFilename } from '../cli/stripFilename';
// import { loadComponents } from '../project/components/loadComponents';
import { createProject } from '../project/createProject';
import { ensureProjectCacheDir } from '../project/ensureProjectCacheDir';
// import { loadSurfaces } from '../project/surfaces/loadSurfaces';
// import { loadThemes } from '../project/themes/loadThemes';
// import { loadTokens } from '../project/tokens/loadTokens';
// import { loadVariants } from '../project/variants/loadVariants';

export const build = async (fileName: string): Promise<void> => {
    console.info(figlet.textSync('Noodles UI'));
    const projectFile = resolve(fileName);
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const project = await createProject(projectFile);
    await ensureProjectCacheDir(project);
    logProjectBasicInfo(project);

    console.log('!!');
    // eslint-disable-next-line security/detect-non-literal-require
    // const projectResource = require(resolve(fileName));

    // logProjectResource(project, projectResource);

    await saveProjectModules(project);
    logProjectModules(project);

    // loadSurfaces(project, projectResource);
    // loadThemes(project, projectResource);
    // loadVariants(project, projectResource);
    // loadComponents(project, projectResource);
    // loadTokens(project, projectResource);

    logSuccess('Build successful');
    logProjectData(project);
    logMessage('\\o/\n | \n/ \\');
};
