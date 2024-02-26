/*
    <reference types="vitest" />
    <reference types="vite/client" />
*/
import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    test: {
        environment: 'jsdom',
        coverage: {
            all: false,
        },
    },
    plugins: [solidPlugin()],
});
