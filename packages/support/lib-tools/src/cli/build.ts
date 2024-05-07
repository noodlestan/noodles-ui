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
import { generateAll } from '../generate/generateAll';
import { deployLive } from '../generate/live/deployLive';
import { updateLib } from '../generate/live/updateLib';
import { ensureFileDir } from '../util/ensureFileDir';

import { addArgsToOptions } from './arguments/addArgsToOptions';
import { getNoEmit } from './arguments/getNoEmit';
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
    clientOptions: CompilerOptions,
): Promise<CompilerContext> => {
    logHeader('build');
    const timings: Array<[number, string]> = [[Date.now(), 'start']];

    const projectFile = resolve(fileName);
    logInfo(`Build project`, stripFilename(projectFile, resolve('.')));

    const options = addArgsToOptions(clientOptions);
    const compiler = await createCompiler(projectFile, options);
    compiler.compileProjectFile();
    timings.push([Date.now(), 'TS compilation of project file']);

    await ensureFileDir(join(compiler.projectPath, NUI_RESOURCES_DIR, 'file'));
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

        const loadingErrors = getDiagnosticErrors(compiler.diagnostics);
        if (!loadingErrors.length && compiler.project.system) {
            const tmpDir = join(compiler.projectPath, NUI_TMP_DIR);
            await generateAll(compiler, tmpDir);
            logGeneratedSourceFiles(compiler);
            await deployLive(compiler, tmpDir);
            timings.push([Date.now(), 'Generating code']);
        }

        if (!compiler.hasErrors() && !getNoEmit() && compiler.project.system) {
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

    await saveBuildSnapshot(compiler);
    if (!compiler.hasErrors()) {
        logMessage('\n \\o/\n  |\n / \\\n\n');
    }
    logTimings(compiler, timings);

    return compiler;
};
