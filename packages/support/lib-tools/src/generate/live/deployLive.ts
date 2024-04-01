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

export const deployLive = async (compiler: CompilerContext): Promise<string> => {
    const sketleton = locateDependencyDir('@noodles-ui/live-solidjs');
    const live = join(compiler.projectPath, NUI_LIVE_DIR);
    await rm(live, { recursive: true, force: true });
    await copyFiles(sketleton, live, { fileFilter });
    await copyUIRootFile(compiler, sketleton, live);
    return join(live, 'src/');
};
