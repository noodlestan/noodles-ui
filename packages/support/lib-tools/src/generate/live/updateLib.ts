import { rm } from 'fs/promises';
import { basename, join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { copyFiles } from '../../util/copyFiles';
import { NUI_GENERATED_DIR, NUI_SOURCE_DIR } from '../constants';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';

const SKIP_LIST = ['root.tsx', 'UIRoot.tsx', 'live.map.ts'];

const fileFilter = (fileName: string): boolean => {
    if (SKIP_LIST.find(name => basename(fileName) === name)) {
        return false;
    }
    if (fileName.endsWith('demo.tsx')) {
        return false;
    }
    return true;
};

export const updateLib = async (project: ProjectContext): Promise<void> => {
    const processFile = async (fileName: string) => {
        if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
            await formatTypescriptFile(project, fileName);
        }
    };

    const live = join(project.projectPath, NUI_SOURCE_DIR);
    const destination = join(project.projectPath, NUI_GENERATED_DIR);
    await rm(destination, { recursive: true, force: true });
    await copyFiles(live, destination, { fileFilter, processFile });
};
