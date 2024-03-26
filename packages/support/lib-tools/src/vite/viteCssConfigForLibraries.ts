export const viteCssConfigForLibraries = (baseDir: string): unknown => {
    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "${baseDir}/src/styles/globals.scss";`,
                },
            },
        },
    };
};
