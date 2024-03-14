import { viteCssConfigForLibraryConsumers } from '@noodles-ui/lib-tools';
import { defineConfig } from '@solidjs/start/config';

const cssConfig = viteCssConfigForLibraryConsumers('@noodles-ui/lab-ui');

export default defineConfig(cssConfig);
