import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import SolidSVG from 'vite-plugin-solid-svg';

const baseDir = '../../libs/lab-ui';

export default defineConfig({
    plugins: [solidPlugin(), SolidSVG()],
    server: {
        port: 3133,
        proxy: {
            '/api': {
                target: 'http://localhost:3131',
                ws: true,
                changeOrigin: true,
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "${baseDir}/src/generated/variants.scss";`,
            },
        },
    },
    build: {
        target: 'es2020',
        sourcemap: true,
    },
});
