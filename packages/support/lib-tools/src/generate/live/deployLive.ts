import { copyFile, mkdir, readFile, readdir, stat, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { logError } from '../../cli/logger/logError';
import { locateDependencyDir } from '../../monorepo/locateDependencyDir';
import { NUI_LIVE_DIR } from '../constants';
import { systemComponentName } from '../system/RootComponent/systemComponentName';
import { tsFileHeader } from '../typescript/tsFileHeader';

const copyFiles = async (source: string, target: string, root?: string): Promise<string[]> => {
    const copies: string[] = [];
    try {
        await mkdir(target, { recursive: true });
        const files = await readdir(source);
        for (const file of files) {
            if (!file.startsWith('_') && !file.endsWith('_')) {
                const sourceFile = join(source, file);
                const fileStats = await stat(sourceFile);
                if (fileStats.isDirectory()) {
                    const targetFile = join(target, file);
                    const nestedCopies = await copyFiles(sourceFile, targetFile, root || target);
                    copies.push(...nestedCopies);
                } else {
                    const targetFile = join(target, file);
                    await copyFile(sourceFile, targetFile);
                    copies.push(targetFile.replace(root || target, ''));
                }
            }
        }
    } catch (err) {
        logError('Error:', err as string);
    }

    return copies;
};

const copyUIRootFile = async (
    project: ProjectContext,
    source: string,
    target: string,
): Promise<string> => {
    const sourceFile = join(source, 'src/UIRoot.tsx');
    const destinationFile = join(target, 'src/UIRoot.tsx');

    const componentName = systemComponentName(project);
    const contents = (await readFile(sourceFile)).toString();
    const output =
        tsFileHeader(project, destinationFile) + contents.replace(/UIRoot_/g, componentName);
    await writeFile(destinationFile, output);

    return destinationFile;
};

export const deployLive = async (project: ProjectContext): Promise<string> => {
    const sketleton = locateDependencyDir('@noodles-ui/live-solidjs');
    resolve(join(__dirname, './skeleton'));
    const live = join(project.projectPath, NUI_LIVE_DIR);
    await copyFiles(sketleton, live);
    await copyUIRootFile(project, sketleton, live);
    return join(live, 'src/');
};
