import { build, createThemeTokensJSONLoader } from '@noodles-ui/lib-tools';

const main = async () => {
    const themeTokensLoader = createThemeTokensJSONLoader();
    const project = await build('./src/nui/LabUI.nui.ts', { themeTokensLoader });
    if (!project.build.success || project.diagnostics.length) {
        process.exit(1);
    }
};

main();
