import { defineViteConfig } from '../../../config/vite-app.config.mjs';
import { viteCssConfigForLibraryConsumers } from '@noodles-ui/lib-tools';

const cssConfig = viteCssConfigForLibraryConsumers('@noodles-ui/lab-ui');

export default defineViteConfig(__dirname, cssConfig);
