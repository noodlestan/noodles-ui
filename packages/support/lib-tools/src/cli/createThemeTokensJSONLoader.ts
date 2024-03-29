import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

import { ThemeResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { ThemeTokensLoader, ThemeTokensSchema } from '../build/types';
import { getThemeIdentifier } from '../entities/theme/getters/getThemeIdentifier';

type LoaderOptions = {
    fileName?: (theme: string) => string;
};

export const createThemeTokensJSONLoader = (options?: LoaderOptions): ThemeTokensLoader => {
    const defaultFileName = (theme: string) => `./src/nui/themes/${theme}/${theme}.tokens.json`;
    const fileName = options?.fileName || defaultFileName;

    return async (project: ProjectContext, theme: ThemeResource) => {
        const themeName = getThemeIdentifier(theme);
        const file = fileName(themeName);
        if (!existsSync(file)) {
            project.addError(theme, `JSON file not found "${file}".`);
            return;
        }
        const contents = await readFile(fileName(themeName));
        try {
            const data = JSON.parse(contents.toString()) as ThemeTokensSchema;
            return data;
        } catch (err) {
            project.addError(theme, `Invalid JSON in "${file}".`);
        }
    };
};
