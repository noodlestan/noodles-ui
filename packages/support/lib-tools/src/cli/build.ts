import { resolve } from 'path';

import figlet from 'figlet';

import { generateComponents } from '../generate/components/generateComponents';
import { generateComponentsList } from '../generate/components/generateComponentsList';
import { loadComponents } from '../project/components/loadComponents';
import { createProject } from '../project/createProject';
import { ensureProjectCacheDir } from '../project/ensureProjectCacheDir';
import { loadSurfaces } from '../project/surfaces/loadSurfaces';
import { loadThemes } from '../project/themes/loadThemes';
import { loadTokens } from '../project/tokens/loadTokens';
import { loadVariants } from '../project/variants/loadVariants';

import { stripFilename } from './format/stripFilename';
import { logBuildOutcome } from './functions/logBuildOutcome';
import { logError } from './functions/logError';
import { logInfo } from './functions/logInfo';
import { logMessage } from './functions/logMessage';
import { logProgramDiagnostics } from './functions/logProgramDiagnostics';
import { logProjectBasicInfo } from './functions/logProjectBasicInfo';
import { logProjectData } from './functions/logProjectData';
import { logProjectDiagnostics } from './functions/logProjectDiagnostics';
import { logProjectDiagnosticsSummary } from './functions/logProjectDiagnosticsSummary';
import { logProjectModules } from './functions/logProjectModules';
import { logProjectResource } from './functions/logProjectResource';
import { logSuccess } from './functions/logSuccess';
import { saveProjectModules } from './io/saveProjectModules';
import { saveProjectResource } from './io/saveProjectResource';

export const build = async (fileName: string): Promise<void> => {
    console.info(figlet.textSync('Noodles UI'));
    const projectFile = resolve(fileName);
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const args = Array.from(process.argv);
    const debug = [];
    while (args.length) {
        const flag = args.shift();
        if (flag && flag.startsWith('--expand')) {
            const value = args[0];
            if (value && !value.startsWith('--expand')) {
                args.shift();
                debug.push(value);
            }
        }
    }

    const project = await createProject(projectFile, debug);
    await ensureProjectCacheDir(project);
    logProjectBasicInfo(project);
    logProgramDiagnostics(project.build.diagnostics);
    logBuildOutcome(project);

    if (project.build.success) {
        logProjectModules(project);
        await saveProjectModules(project);

        // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
        const projectResource = require(resolve(fileName)).default;
        logProjectResource(projectResource);
        await saveProjectResource(project, projectResource);

        loadSurfaces(project, projectResource);
        loadThemes(project, projectResource);
        loadVariants(project, projectResource);
        loadComponents(project, projectResource);
        loadTokens(project, projectResource);

        if (project.diagnostics.length) {
            logError(`Encountered ${project.diagnostics.length} issues during load`);
            logError(`Skipping code generation`);
        } else {
            await generateComponentsList(project);
            await generateComponents(project);
        }

        if (project.diagnostics.length) {
            logError(`Build completed with ${project.diagnostics.length} issues`);
            logProjectDiagnostics(project);
            logProjectData(project);
            logProjectDiagnosticsSummary(project);
            return;
        }

        logSuccess('Build successful');
        logProjectData(project);
        logMessage('\n \\o/\n  |\n / \\\n\n');
    }
};
