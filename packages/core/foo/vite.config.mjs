/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';
// import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [
        typescript({
            target: 'es2020',
            rootDir: resolve('./src'),
            declaration: true,
            noEmitOnError: false,
        }),
        //   solidPlugin(),
    ],

    // resolve: {
    //   alias: [{ find: "@", replacement: resolve(dir, "src") }],
    // },
    // server: {
    //   port: 3000,
    // },
    build: {
        //   target: "es2020",
        sourcemap: true,
        lib: {
            entry: resolve('./src/index.ts'),
            name: 'test',
            fileName: 'index',
        },
        //   rollupOptions: {
        //     external: ["solid-js"],
        //   },
    },
});
