import { variantsScssFileName } from '../generate/variants/paths/variantsScssFileName';

import { UserConfig } from './UserConfig';
import { resolvePackage } from './resolvePackage';

export const viteCssConfigForLibraryConsumers = (module: string): UserConfig => {
    const modulePath = resolvePackage(module);
    const scssFile = variantsScssFileName(modulePath);
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
