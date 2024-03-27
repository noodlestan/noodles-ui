import { ThemeResource, ThemeTokens } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { ThemeTokensLoader } from '../../../../build/types';

export const loadThemeTokens = async (
    project: ProjectContext,
    theme: ThemeResource,
    getThemeTokens: ThemeTokensLoader,
): Promise<ThemeTokens | undefined> => {
    try {
        const loaded = await getThemeTokens(project, theme);
        return loaded?.tokens;
    } catch (err) {
        project.addError('project', (err as Error).message);
    }
};
