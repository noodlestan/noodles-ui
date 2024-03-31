import { rm } from 'fs/promises';
import { basename, join } from 'path';

import { CompilerContext } from '@noodles-ui/support-types';

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

export const updateLib = async (compiler: CompilerContext): Promise<void> => {
    const processFile = async (fileName: string) => {
        if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
            await formatTypescriptFile(compiler, fileName);
        }
    };

    const live = join(compiler.projectPath, NUI_SOURCE_DIR);
    const destination = join(compiler.projectPath, NUI_GENERATED_DIR);
    await rm(destination, { recursive: true, force: true });
    await copyFiles(live, destination, { fileFilter, processFile });
};
