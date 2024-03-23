import { copyFile, mkdir, readdir, stat } from 'fs/promises';
import { join, resolve } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { logError } from '../../cli/logger/logError';
import { logInfo } from '../../cli/logger/logInfo';
import { logMessage } from '../../cli/logger/logMessage';
import { NUI_LIVE_FOLDER } from '../constants';

const copyFiles = async (source: string, target: string, root?: string): Promise<string[]> => {
    const copies: string[] = [];
    try {
        await mkdir(target, { recursive: true });
        const files = await readdir(source);
        for (const file of files) {
            const sourceFile = join(source, file);
            const fileStats = await stat(sourceFile);
            if (fileStats.isDirectory()) {
                const targetFile = join(target, file);
                const nestedCopies = await copyFiles(sourceFile, targetFile, root || target);
                copies.push(...nestedCopies);
            } else if (file.startsWith('_')) {
                const targetFile = join(target, file.replace(/^_/, '').replace(/.sk$/, ''));
                await copyFile(sourceFile, targetFile);
                copies.push(targetFile.replace(root || target, ''));
            }
        }
    } catch (err) {
        logError('Error:', err as string);
    }

    return copies;
};

export const deployLive = async (project: ProjectContext): Promise<string> => {
    const sketleton = resolve(join(__dirname, '../../../../src/generate/live/skeleton'));
    const live = join(project.projectPath, NUI_LIVE_FOLDER);
    logInfo('...deploying NUI live...');
    const deployed = await copyFiles(sketleton, live);
    logMessage('  deployed: ', deployed.join(', '));
    console.info(' ');

    return join(live, 'src/target');
};
