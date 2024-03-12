import { resolve } from 'path';

import { generateComponents } from '../generate/generateComponents';
import { generateComponentsList } from '../generate/generateComponentsList';
import { generateVariants } from '../generate/generateVariants';
import { createProject } from '../project/createProject';
import { ensureGeneratedDir } from '../project/ensureGeneratedDir';
import { ensureProjectCacheDir } from '../project/ensureProjectCacheDir';
import { ProjectContext } from '../types/projects';

import { getExpandPatterns } from './arguments/getExpandPatterns';
import { stripFilename } from './format/stripFilename';
import { saveProjectModulesCache } from './io/saveProjectModulesCache';
import { saveProjectResourceCache } from './io/saveProjectResourceCache';
import { loadProject } from './loadProject';
import { logBuildOutcome } from './log/logBuildOutcome';
import { logHeader } from './log/logHeader';
import { logProgramDiagnostics } from './log/logProgramDiagnostics';
import { logProjectBasicInfo } from './log/logProjectBasicInfo';
import { logProjectData } from './log/logProjectData';
import { logProjectDiagnostics } from './log/logProjectDiagnostics';
import { logProjectDiagnosticsSummary } from './log/logProjectDiagnosticsSummary';
import { logProjectModules } from './log/logProjectModules';
import { logProjectResource } from './log/logProjectResource';
import { logTimings } from './log/logTimings';
import { logError } from './logger/logError';
import { logInfo } from './logger/logInfo';
import { logMessage } from './logger/logMessage';
import { logSuccess } from './logger/logSuccess';

export const build = async (fileName: string): Promise<ProjectContext> => {
    logHeader('build');
    const timings: Array<[number, string]> = [[Date.now(), 'start']];

    const projectFile = resolve(fileName);
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const expandPatterns = getExpandPatterns();
    const project = await createProject(projectFile, expandPatterns);
    project.compileProjectFile();
    timings.push([Date.now(), 'project created']);

    await ensureProjectCacheDir(project);
    logProjectBasicInfo(project);
    logProgramDiagnostics(project.build.diagnostics || []);
    logBuildOutcome(project);

    if (project.build.success) {
        logProjectModules(project);
        await saveProjectModulesCache(project);
        timings.push([Date.now(), 'modules cache saved']);

        // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
        const projectResource = require(resolve(fileName)).default;
        timings.push([Date.now(), 'resource file loaded']);

        logProjectResource(projectResource);
        await saveProjectResourceCache(project, projectResource);
        timings.push([Date.now(), 'resources cache saved']);

        loadProject(project, projectResource);
        timings.push([Date.now(), 'resources loaded']);

        if (project.diagnostics.length) {
            logError(`Encountered ${project.diagnostics.length} issues during load`);
            logError(`Skipping code generation`);
        } else {
            logInfo(`Generating code`);
            await ensureGeneratedDir(project);
            await generateComponentsList(project);
            await generateComponents(project);
            await generateVariants(project);
            timings.push([Date.now(), 'code generated']);
        }

        if (project.diagnostics.length) {
            logProjectDiagnostics(project);
            logProjectData(project);
            logProjectDiagnosticsSummary(project);
        } else {
            logSuccess('Build successful');
            logProjectData(project);
            logMessage('\n \\o/\n  |\n / \\\n\n');
        }
    }

    logTimings(timings);

    return project;
};
