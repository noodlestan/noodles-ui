import { NUI_GENERATED_FOLDER } from '../generate/constants';

export const viteCssConfigForLibraries = (baseDir: string): unknown => {
    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "${baseDir}/${NUI_GENERATED_FOLDER}/variants.scss";`,
                },
            },
        },
    };
};
