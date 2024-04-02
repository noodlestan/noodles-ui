import { ProjectConfig, createThemeTokensJSONLoader } from '@noodles-ui/lib-tools';

const themeTokensLoader = createThemeTokensJSONLoader();

const config: ProjectConfig = {
    projectFile: './src/nui/SolidJsStyled.nui.ts',
    compilerOptions: {
        themeTokensLoader,
    },
};

export default config;
