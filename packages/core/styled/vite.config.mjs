import { join } from 'path';
import { defineViteConfig } from '../../../config/vite-lib.config.mjs';
import packageJson from './package.json';

const placeholders = join(__dirname, 'placeholders/index.scss');
const cssConfig = {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "${placeholders}";`,
            },
        },
    },
};

export default defineViteConfig(__dirname, packageJson.name, cssConfig);
