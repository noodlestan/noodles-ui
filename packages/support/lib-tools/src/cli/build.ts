import { resolve } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { generateComponents } from '../generate/generateComponents';
import { generateComponentsList } from '../generate/generateComponentsList';
import { generateVariants } from '../generate/generateVariants';
import { createProject } from '../project/createProject';
import { ensureGeneratedDir } from '../project/ensureGeneratedDir';
import { ensureProjectCacheDir } from '../project/ensureProjectCacheDir';

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

export const build = async (fileName: string): Promise<ProjectContext> => {
    logHeader('build');
    const timings: Array<[number, string]> = [[Date.now(), 'start']];

    const projectFile = resolve(fileName);
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const expandPatterns = getExpandPatterns();
    const project = await createProject(projectFile, expandPatterns);
    project.compileProjectFile();
    timings.push([Date.now(), 'project compiled']);

    await ensureProjectCacheDir(project);
    logProjectBasicInfo(project);
    logProgramDiagnostics(project.build.diagnostics || []);
    logBuildOutcome(project);

    if (project.build.success) {
        logProjectModules(project);
        await saveProjectModulesCache(project);

        // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
        const resourceData = require(resolve(fileName)).default;
        timings.push([Date.now(), 'project file loaded']);

        logProjectResource(resourceData);
        await saveProjectResourceCache(project, resourceData);

        loadProject(project, resourceData);
        timings.push([Date.now(), 'resources loaded']);
        await saveProjectSnapshot(project);

        if (project.diagnostics.length) {
            logError(`Encountered ${project.diagnostics.length} issues during load`);
            logError(`Skipping code generation`);
        } else {
            logInfo(`Generating code`);
            await ensureGeneratedDir(project);
            await generateComponentsList(project);
            await generateComponents(project);
            await generateVariants(project);
            logGeneratedSourceFiles(project);
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
