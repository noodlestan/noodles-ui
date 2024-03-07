import { resolve } from 'path';

import figlet from 'figlet';

import { generateComponents } from '../generate/components/generateComponents';
import { generateComponentsList } from '../generate/components/generateComponentsList';
import { generateVariants } from '../generate/variants/generateVariants';
import { createProject } from '../project/createProject';
import { ensureProjectCacheDir } from '../project/ensureProjectCacheDir';
import { ProjectContext } from '../types/projects';

import { getExpandPatterns } from './arguments/getExpandPatterns';
import { stripFilename } from './format/stripFilename';
import { saveProjectModulesCache } from './io/saveProjectModulesCache';
import { saveProjectResourceCache } from './io/saveProjectResourceCache';
import { loadProject } from './loadProject';
import { logBuildOutcome } from './log/logBuildOutcome';
import { logProgramDiagnostics } from './log/logProgramDiagnostics';
import { logProjectBasicInfo } from './log/logProjectBasicInfo';
import { logProjectData } from './log/logProjectData';
import { logProjectDiagnostics } from './log/logProjectDiagnostics';
import { logProjectDiagnosticsSummary } from './log/logProjectDiagnosticsSummary';
import { logProjectModules } from './log/logProjectModules';
import { logProjectResource } from './log/logProjectResource';
import { logError } from './logger/logError';
import { logInfo } from './logger/logInfo';
import { logMessage } from './logger/logMessage';
import { logSuccess } from './logger/logSuccess';

export const build = async (fileName: string): Promise<ProjectContext> => {
    console.info(figlet.textSync('Noodles UI'));
    const projectFile = resolve(fileName);
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const expandPatterns = getExpandPatterns();
    const project = await createProject(projectFile, expandPatterns);
    await ensureProjectCacheDir(project);
    logProjectBasicInfo(project);
    logProgramDiagnostics(project.build.diagnostics);
    logBuildOutcome(project);

    if (project.build.success) {
        logProjectModules(project);
        await saveProjectModulesCache(project);

        // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
        const projectResource = require(resolve(fileName)).default;
        logProjectResource(projectResource);
        await saveProjectResourceCache(project, projectResource);

        loadProject(project, projectResource);
        if (project.diagnostics.length) {
            logError(`Encountered ${project.diagnostics.length} issues during load`);
            logError(`Skipping code generation`);
        } else {
            logInfo(`Generating code`);
            await generateComponentsList(project);
            await generateComponents(project);
            await generateVariants(project);
        }

        if (project.diagnostics.length) {
            logProjectDiagnostics(project);
            logProjectData(project);
            logProjectDiagnosticsSummary(project);
            return project;
        }

        logSuccess('Build successful');
        logProjectData(project);
        logMessage('\n \\o/\n  |\n / \\\n\n');
    }

    return project;
};
