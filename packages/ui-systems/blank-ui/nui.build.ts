import { build, createThemeTokensJSONLoader } from '@noodles-ui/lib-tools';

const main = async () => {
    const themeTokensLoader = createThemeTokensJSONLoader();
    const project = await build('./src/nui/BlankUI.nui.ts', { themeTokensLoader });
    if (project.hasErrors()) {
        process.exit(1);
    }
};

main();
