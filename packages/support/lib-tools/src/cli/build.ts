import { rm } from 'fs/promises';
import { join, resolve } from 'path';

import { ProjectContext, getDiagnosticErrors } from '@noodles-ui/support-types';
import { white } from 'kleur';

import { BuildOptions } from '../build/types';
import { NUI_GENERATED_DIR, NUI_TMP_DIR } from '../generate/constants';
import { generateComponents } from '../generate/generateComponents';
import { generateRoot } from '../generate/generateRoot';
import { generateSurfaces } from '../generate/generateSurfaces';
import { generateThemes } from '../generate/generateThemes';
import { generateVariants } from '../generate/generateVariants';
import { deployLive } from '../generate/live/deployLive';
import { updateLib } from '../generate/live/updateLib';
import { createProject } from '../project/createProject';
import { ensureProjectCacheDir } from '../project/private/ensureProjectCacheDir';
import { copyFiles } from '../util/copyFiles';

import { getExpandPatterns } from './arguments/getExpandPatterns';
import { getNoEmit } from './arguments/getNoEmit';
import { getShowHints } from './arguments/getShowHints';
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
    options.interactive = options.interactive || {};
    options.interactive.expand = options.interactive.expand || [];
    options.interactive.expand.push(...expandPatterns);
    const showHints = getShowHints();
    options.interactive.expand = options.interactive.expand || [];
    options.interactive.hints = showHints;
    const project = await createProject(projectFile, options);
    project.compileProjectFile();
    timings.push([Date.now(), 'TS compilation of project file']);

    await ensureProjectCacheDir(project);
    logProjectBasicInfo(project);
    logProgramDiagnostics(project);
    logBuildOutcome(project);

    if (!project.hasErrors()) {
        logProjectModules(project);
        await saveProjectModulesCache(project);

        // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
        const resourceData = require(resolve(fileName)).default;
        timings.push([Date.now(), 'Loading project file']);

        logProjectResource(project, resourceData);
        await saveProjectResourceCache(project, resourceData);

        await loadProject(project, resourceData, options);
        timings.push([Date.now(), 'Loading resources from project']);
        await saveProjectSnapshot(project);

        const loadingErrors = getDiagnosticErrors(project.diagnostics);
        if (!loadingErrors.length) {
            const tmpDir = join(project.projectPath, NUI_TMP_DIR);
            await rm(tmpDir, { recursive: true, force: true });
            await generateRoot(project, tmpDir);
            await generateSurfaces(project, tmpDir);
            await generateThemes(project, tmpDir);
            await generateComponents(project, tmpDir);
            await generateVariants(project, tmpDir);
            logGeneratedSourceFiles(project);
            const liveDir = await deployLive(project);
            await copyFiles(tmpDir, liveDir);
            timings.push([Date.now(), 'Generating code']);
        }

        if (!project.hasErrors() && !getNoEmit()) {
            await updateLib(project);
            logSuccess('Updated target', white().bold('./' + NUI_GENERATED_DIR));
            timings.push([Date.now(), 'Updating target']);
        }

        if (project.diagnostics.length) {
            logProjectDiagnostics(project);
            logProjectData(project);
            logProjectDiagnosticsSummary(project);
            if (loadingErrors.length) {
                logError(`Encountered ${loadingErrors.length} issues during load.`);
                logError(`Code generation was skipped.`);
            }
        } else {
            logSuccess('Build successful');
            logProjectData(project);
        }
    }

    if (!project.hasErrors()) {
        logMessage('\n \\o/\n  |\n / \\\n\n');
    }
    logTimings(project, timings);

    return project;
};
