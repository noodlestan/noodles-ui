/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export const defineViteConfig = (dir, libName, config = {}) => {
    return defineConfig(({ mode }) => {
        return {
            ...config,
            plugins: [
                typescript({
                    target: 'es2020',
                    rootDir: resolve(dir, 'src'),
                    declaration: true,
                    noEmitOnError: mode === 'production',
                }),
                solidPlugin(),
            ],

            resolve: {
                alias: [{ find: '@', replacement: resolve(dir, 'src') }],
            },
            server: {
                port: 3000,
            },
            build: {
                target: 'es2020',
                sourcemap: true,
                lib: {
                    entry: resolve(dir, 'src/index.ts'),
                    name: libName,
                    fileName: 'index',
                },
                rollupOptions: {
                    external: ['solid-js'],
                },
            },
        };
    });
};
