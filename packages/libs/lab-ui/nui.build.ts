import { build, createThemeTokensJSONLoader } from '@noodles-ui/lib-tools';

const main = async () => {
    const themeTokensLoader = createThemeTokensJSONLoader();
    await build('./src/nui/LabUI.nui.ts', { themeTokensLoader });
};

main();
