/* eslint-disable import/no-extraneous-dependencies */
/*
    <reference types="vitest" />
    <reference types="vite/client" />
*/

import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';

export const defineVitestConfig = dir => {
    return defineConfig({
        test: {
            environment: 'jsdom',
            coverage: {
                all: false,
            },
        },
        plugins: [solidPlugin()],
    });
};
