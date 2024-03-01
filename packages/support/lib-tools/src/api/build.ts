import { resolve } from 'path';

import figlet from 'figlet';
import { yellow } from 'kleur';

import { logBuildOutcome } from '../cli/logBuildOutcome';
import { logInfo } from '../cli/logInfo';
import { logMessage } from '../cli/logMessage';
import { logProgramDiagnostics } from '../cli/logProgramDiagnostics';
import { logProjectBasicInfo } from '../cli/logProjectBasicInfo';
import { logProjectData } from '../cli/logProjectData';
import { logProjectDiagnostics } from '../cli/logProjectDiagnostics';
import { logProjectDiagnosticsSummary } from '../cli/logProjectDiagnosticsSummary';
import { logProjectModules } from '../cli/logProjectModules';
import { logProjectResource } from '../cli/logProjectResource';
import { logSuccess } from '../cli/logSuccess';
import { saveProjectModules } from '../cli/saveProjectModules';
import { saveProjectResource } from '../cli/saveProjectResource';
import { stripFilename } from '../cli/stripFilename';
import { loadComponents } from '../project/components/loadComponents';
import { createProject } from '../project/createProject';
import { ensureProjectCacheDir } from '../project/ensureProjectCacheDir';
import { loadSurfaces } from '../project/surfaces/loadSurfaces';
import { loadThemes } from '../project/themes/loadThemes';
import { loadTokens } from '../project/tokens/loadTokens';
import { loadVariants } from '../project/variants/loadVariants';

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

        const issues = project.diagnostics;

        if (issues.length) {
            logSuccess(yellow(`Build completed with ${issues.length} issues`));
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
