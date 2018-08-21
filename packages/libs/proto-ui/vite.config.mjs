import { defineViteConfig } from '../../../config/vite-lib.config.mjs';
import packageJson from './package.json';

import { viteCssConfigForLibraries } from '@noodles-ui/lib-tools';

const cssConfig = viteCssConfigForLibraries(__dirname);

export default defineViteConfig(__dirname, packageJson.name, cssConfig);
