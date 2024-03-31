import { ChildProcess, spawn } from 'node:child_process';
import { join } from 'node:path';

import { CompilerContext } from '@noodles-ui/support-types';

import { NUI_LIVE_DIR } from '../generate/constants';

export const execLive = (compiler: CompilerContext): ChildProcess => {
    const cwd = join(compiler.projectPath, NUI_LIVE_DIR);
    const ls = spawn('npm', ['run', 'dev'], { cwd });
    return ls;
};
