import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import SolidSVG from 'vite-plugin-solid-svg';

export default defineConfig({
    plugins: [solidPlugin(), SolidSVG()],
    server: {
        port: 3133,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/globals.scss";`,
            },
        },
    },
    build: {
        target: 'esnext',
        sourcemap: true,
    },
});
