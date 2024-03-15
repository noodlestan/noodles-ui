import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import SolidSVG from 'vite-plugin-solid-svg';

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
    build: {
        target: 'es2020',
        sourcemap: true,
    },
});
