import { readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { getSystemComponentName } from '@noodles-ui/core-entities';

import { locateDependencyDir } from '../../monorepo/locateDependencyDir';
import { copyFiles } from '../../util/copyFiles';
import { NUI_LIVE_DIR } from '../constants';
import { tsFileHeader } from '../typescript/tsFileHeader';

const copyUIRootFile = async (
    compiler: CompilerContext,
    source: string,
    target: string,
): Promise<string> => {
    const sourceFile = join(source, 'src/UIRoot.tsx');
    const destinationFile = join(target, 'src/UIRoot.tsx');

    const componentName = getSystemComponentName(compiler);
    const contents = (await readFile(sourceFile)).toString();
    const output =
        tsFileHeader(compiler, destinationFile) + contents.replace(/UIRoot_/g, componentName);
    await writeFile(destinationFile, output);

    return destinationFile;
};

const fileFilter = (file: string) => !file.startsWith('_') && !file.endsWith('_');

const deployLiveSkeleton = async (
    compiler: CompilerContext,
    sketletonDir: string,
): Promise<void> => {
    const live = join(compiler.projectPath, NUI_LIVE_DIR);
    await rm(live, { recursive: true, force: true });
    await copyFiles(sketletonDir, live, { fileFilter });
};

const deployLiveSrc = async (
    compiler: CompilerContext,
    sketletonDir: string,
    sourceDir: string,
): Promise<string> => {
    const liveDir = join(compiler.projectPath, NUI_LIVE_DIR);
    await copyUIRootFile(compiler, sketletonDir, liveDir);

    const liveSrcDir = join(liveDir, 'src/');
    await copyFiles(sourceDir, liveSrcDir);

    return liveSrcDir;
};

export const deployLive = async (compiler: CompilerContext, sourceDir: string): Promise<string> => {
    const sketletonDir = locateDependencyDir('@noodles-ui/live-solidjs');
    await deployLiveSkeleton(compiler, sketletonDir);
    const liveSrcDir = await deployLiveSrc(compiler, sketletonDir, sourceDir);
    return liveSrcDir;
};

export const redeployLive = async (
    compiler: CompilerContext,
    sourceDir: string,
): Promise<string> => {
    const sketletonDir = locateDependencyDir('@noodles-ui/live-solidjs');
    const liveSrcDir = await deployLiveSrc(compiler, sketletonDir, sourceDir);
    return liveSrcDir;
};
