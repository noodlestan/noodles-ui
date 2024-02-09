/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import SolidSVG from 'vite-plugin-solid-svg';

/* TODO devtools issue with monorepo? fails on import
import devtools from 'solid-devtools/vite';

https://github.com/thetarnav/solid-devtools

No known conditions for "./vite" specifier in "solid-devtools" package [plugin externalize-deps]
The plugin "externalize-deps" was triggered by this import

../../config/vite-app.config.ts:5:21:
    5 │ import devtools from 'solid-devtools/vite';

*/

export const defineViteConfig = (dir, config = {}) => {
    return defineConfig({
        ...config,
        plugins: [
            // devtools({
            //     autoname: true,
            // }),
            solidPlugin(),
            SolidSVG(),
        ],
        resolve: {
            alias: [{ find: '@', replacement: resolve(dir, 'src') }],
        },
        server: {
            port: 3000,
        },
        build: {
            target: 'esnext',
        },
    });
};
