import { spawn } from 'node:child_process';

import { red } from 'kleur';

import { logChildData } from '../cli/logChildData';

export const execBuild = async (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const ls = spawn('npm', ['run', 'build:nui']);
        ls.stdout.on('data', data => logChildData('[Build]', data));
        ls.stderr.on('data', data => logChildData('[Build] ' + red('[!]'), data));
        ls.on('close', code => {
            if (code) {
                reject(code);
            } else {
                resolve(0);
            }
        });
    });
};
