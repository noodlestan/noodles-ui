import { rm } from 'fs/promises';
import { join, resolve } from 'path';

import {
    CompilerContext,
    CompilerOptions,
    NUI_RESOURCES_DIR,
    createCompiler,
    loadProject,
} from '@noodles-ui/core-compiler';
import { getDiagnosticErrors } from '@noodles-ui/core-diagnostics';
import { white } from 'kleur';

import { NUI_GENERATED_DIR, NUI_TMP_DIR } from '../generate/constants';
import { generateComponents } from '../generate/generateComponents';
import { generateRoot } from '../generate/generateRoot';
import { generateSurfaces } from '../generate/generateSurfaces';
import { generateThemes } from '../generate/generateThemes';
import { generateVariants } from '../generate/generateVariants';
import { deployLive } from '../generate/live/deployLive';
import { updateLib } from '../generate/live/updateLib';
import { copyFiles } from '../util/copyFiles';
import { ensuredFiledir } from '../util/ensuredFiledir';

import { getExpandPatterns } from './arguments/getExpandPatterns';
import { getNoEmit } from './arguments/getNoEmit';
import { getShowHints } from './arguments/getShowHints';
import { saveBuildModulesCache } from './cache/saveBuildModulesCache';
import { saveBuildSnapshot } from './cache/saveBuildSnapshot';
import { saveProjectResourceCache } from './cache/saveProjectResourceCache';
import { stripFilename } from './format/stripFilename';
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

export const build = async (
    fileName: string,
    options: CompilerOptions,
): Promise<CompilerContext> => {
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
    const compiler = await createCompiler(projectFile, options);
    compiler.compileProjectFile();
    timings.push([Date.now(), 'TS compilation of project file']);

    await ensuredFiledir(join(compiler.projectPath, NUI_RESOURCES_DIR, 'file'));
    logProjectBasicInfo(compiler);
    logProgramDiagnostics(compiler);
    logBuildOutcome(compiler);

    if (!compiler.hasErrors()) {
        logProjectModules(compiler);
        await saveBuildModulesCache(compiler);

        // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
        const resourceData = require(resolve(fileName)).default;
        timings.push([Date.now(), 'Loading project file']);

        logProjectResource(compiler, resourceData);
        await saveProjectResourceCache(compiler, resourceData);

        await loadProject(compiler, resourceData, options);
        timings.push([Date.now(), 'Loading resources from project']);
        await saveBuildSnapshot(compiler);

        const loadingErrors = getDiagnosticErrors(compiler.diagnostics);
        if (!loadingErrors.length) {
            const tmpDir = join(compiler.projectPath, NUI_TMP_DIR);
            await rm(tmpDir, { recursive: true, force: true });
            await generateRoot(compiler, tmpDir);
            await generateSurfaces(compiler, tmpDir);
            await generateThemes(compiler, tmpDir);
            await generateComponents(compiler, tmpDir);
            await generateVariants(compiler, tmpDir);
            logGeneratedSourceFiles(compiler);
            const liveDir = await deployLive(compiler);
            await copyFiles(tmpDir, liveDir);
            timings.push([Date.now(), 'Generating code']);
        }

        if (!compiler.hasErrors() && !getNoEmit()) {
            await updateLib(compiler);
            logSuccess('Updated target', white().bold('./' + NUI_GENERATED_DIR));
            timings.push([Date.now(), 'Updating target']);
        }

        if (compiler.diagnostics.length) {
            logProjectDiagnostics(compiler);
            logProjectData(compiler);
            logProjectDiagnosticsSummary(compiler);
            if (loadingErrors.length) {
                logError(`Encountered ${loadingErrors.length} issues during load.`);
                logError(`Code generation was skipped.`);
            }
        } else {
            logSuccess('Build successful');
            logProjectData(compiler);
        }
    }

    if (!compiler.hasErrors()) {
        logMessage('\n \\o/\n  |\n / \\\n\n');
    }
    logTimings(compiler, timings);

    return compiler;
};
