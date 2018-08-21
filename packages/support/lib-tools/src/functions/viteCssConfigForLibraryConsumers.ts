import type { UserConfig } from 'vite';

import { resolvePackage } from './resolvePackage.js';

export const viteCssConfigForLibraryConsumers = (module: string): UserConfig => {
    const modulePath = resolvePackage(module);

    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "${modulePath}/src/generated/variants.scss";`,
                },
            },
        },
    };
};
