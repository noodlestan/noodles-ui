import { ProjectConfig, createThemeTokensJSONLoader } from '@noodles-ui/lib-tools';

const themeTokensLoader = createThemeTokensJSONLoader();

const config: ProjectConfig = {
    projectFile: './src/nui/LabUI.nui.ts',
    compilerOptions: {
        themeTokensLoader,
    },
};

export default config;
