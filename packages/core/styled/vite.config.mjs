import { defineViteConfig } from '../../../config/vite-lib.config.mjs';
import packageJson from './package.json';

export default defineViteConfig(__dirname, packageJson.name);
