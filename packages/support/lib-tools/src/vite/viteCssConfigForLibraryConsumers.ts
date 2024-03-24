import { systemRootScssFileName } from '../generate/system/paths/systemRootScssFileName';

import { UserConfig } from './UserConfig';
import { resolvePackage } from './resolvePackage';

export const viteCssConfigForLibraryConsumers = (module: string): UserConfig => {
    const modulePath = resolvePackage(module);
    const scssFile = systemRootScssFileName(modulePath);
    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "${scssFile}";`,
                },
            },
        },
    };
};
