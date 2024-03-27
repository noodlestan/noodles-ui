import { ChildProcess, spawn } from 'node:child_process';
import { join } from 'node:path';

import { ProjectContext } from '@noodles-ui/support-types';

import { NUI_LIVE_DIR } from '../generate/constants';

export const execLive = (project: ProjectContext): ChildProcess => {
    const cwd = join(project.projectPath, NUI_LIVE_DIR);
    const ls = spawn('npm', ['run', 'dev'], { cwd });
    return ls;
};
