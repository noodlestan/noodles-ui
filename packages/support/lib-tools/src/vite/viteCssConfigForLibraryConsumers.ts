import { UserConfig } from './UserConfig';
import { resolvePackage } from './resolvePackage';

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
