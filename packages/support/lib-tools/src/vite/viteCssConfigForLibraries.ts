export const viteCssConfigForLibraries = (baseDir: string): unknown => {
    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "${baseDir}/src/generated/styles/globals.scss";`,
                },
            },
        },
    };
};
