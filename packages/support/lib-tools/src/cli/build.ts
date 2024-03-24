import { resolve } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../build/types';
import { generateComponents } from '../generate/generateComponents';
import { generateRoot } from '../generate/generateRoot';
import { generateSurfaces } from '../generate/generateSurfaces';
import { generateThemes } from '../generate/generateThemes';
import { generateVariants } from '../generate/generateVariants';
import { deployLive } from '../generate/live/deployLive';
import { createProject } from '../project/createProject';
import { ensureGeneratedDir } from '../project/private/ensureGeneratedDir';
import { ensureProjectCacheDir } from '../project/private/ensureProjectCacheDir';

import { getExpandPatterns } from './arguments/getExpandPatterns';
import { stripFilename } from './format/stripFilename';
import { saveProjectModulesCache } from './io/saveProjectModulesCache';
import { saveProjectResourceCache } from './io/saveProjectResourceCache';
import { saveProjectSnapshot } from './io/saveProjectSnapshot';
import { loadProject } from './loadProject';
import { logBuildOutcome } from './log/logBuildOutcome';
import { logGeneratedSourceFiles } from './log/logGeneratedSourceFiles';
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

export const build = async (fileName: string, options: BuildOptions): Promise<ProjectContext> => {
    logHeader('build');
    const timings: Array<[number, string]> = [[Date.now(), 'start']];

    const projectFile = resolve(fileName);
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const expandPatterns = getExpandPatterns();
    const project = await createProject(projectFile, expandPatterns);
    project.compileProjectFile();
    timings.push([Date.now(), 'TS compilation of project file']);

    await ensureProjectCacheDir(project);
    logProjectBasicInfo(project);
    logProgramDiagnostics(project.build.diagnostics || []);
    logBuildOutcome(project);

    if (project.build.success) {
        logProjectModules(project);
        await saveProjectModulesCache(project);

        // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
        const resourceData = require(resolve(fileName)).default;
        timings.push([Date.now(), 'Loading project file']);

        logProjectResource(resourceData);
        await saveProjectResourceCache(project, resourceData);

        loadProject(project, resourceData, options);
        timings.push([Date.now(), 'Loading resources from project']);
        await saveProjectSnapshot(project);

        const live = true;
        const prod = false;

        const loadingErrors = project.diagnostics.length;
        if (!loadingErrors) {
            if (live) {
                logInfo(`...generating live preview...`);
                const liveDir = await deployLive(project);
                await generateRoot(project, liveDir);
                await generateSurfaces(project, liveDir);
                await generateThemes(project, liveDir);
                await generateComponents(project, liveDir);
                await generateVariants(project, liveDir);
                logGeneratedSourceFiles(project);
                timings.push([Date.now(), 'Generating code']);
            }
            if (prod) {
                logInfo(`...generating production code...`);
                await ensureGeneratedDir(project);
                logGeneratedSourceFiles(project);
                timings.push([Date.now(), 'Generating code']);
            }
        }

        if (project.diagnostics.length) {
            logProjectDiagnostics(project);
            logProjectData(project);
            logProjectDiagnosticsSummary(project);
            if (loadingErrors) {
                logError(`Encountered ${loadingErrors} issues during load.`);
                logError(`Code generation was skipped.`);
            }
        } else {
            logSuccess('Build successful');
            logProjectData(project);
            logMessage('\n \\o/\n  |\n / \\\n\n');
        }
    }

    logTimings(timings);

    return project;
};
