#!/usr/bin/env ts-node
import { resolve } from 'path';

import { ProjectConfig } from '@noodles-ui/core-compiler-types';

import { build } from './cli/build';
import { dev } from './cli/dev';
import { logError } from './cli/logger/logError';

const fileName = './nui.config.ts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const options = require(resolve(fileName)).default as ProjectConfig;

export const getCommand = (): string | undefined => {
    const args = Array.from(process.argv);
    return args.find(arg => arg === 'dev' || arg === 'build');
};

const main = async () => {
    const command = getCommand();
    if (command === 'dev') {
        return dev(options.projectFile, options.compilerOptions);
    }
    if (command === 'build') {
        const project = await build(options.projectFile, options.compilerOptions);
        if (project.hasErrors()) {
            process.exit(1);
        }
        return;
    }

    logError('Unknown command. Available commands: "nui dev", "nui build"');
};

main();
