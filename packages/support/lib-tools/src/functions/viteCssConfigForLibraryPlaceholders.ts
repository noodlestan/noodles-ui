// import { UserConfig } from 'vite';

export const viteCssConfigForLibraryPlaceholders = (baseDir: string): unknown => {
    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "${baseDir}/placeholders/index.scss";`,
                },
            },
        },
    };
};
