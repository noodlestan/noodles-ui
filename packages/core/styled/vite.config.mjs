import { defineViteConfig } from '../../../config/vite-lib.config.mjs';
import packageJson from './package.json';

import { viteCssConfigForLibraryPlaceholders } from '@noodles-ui/lib-tools';

const cssConfig = viteCssConfigForLibraryPlaceholders(__dirname);

export default defineViteConfig(__dirname, packageJson.name, cssConfig);
