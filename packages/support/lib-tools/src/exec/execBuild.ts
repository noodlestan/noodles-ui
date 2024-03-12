import { spawn } from 'node:child_process';

export const execBuild = async (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const ls = spawn('npm', ['run', 'build:nui'], { stdio: 'inherit' });
        ls.on('close', code => {
            if (code) {
                reject(code);
            } else {
                resolve(0);
            }
        });
    });
};
