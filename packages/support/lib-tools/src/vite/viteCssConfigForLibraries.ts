import { NUI_GENERATED_DIR } from '../generate/constants';

export const viteCssConfigForLibraries = (baseDir: string): unknown => {
    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "${baseDir}/${NUI_GENERATED_DIR}/variants.scss";`,
                },
            },
        },
    };
};
