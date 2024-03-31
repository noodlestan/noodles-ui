import { ThemeResource } from '@noodles-ui/core-resources';
import { ThemeTokens } from '@noodles-ui/core-types';

import { CompilerContext, ThemeTokensLoader } from '../../../types';

export const loadThemeTokens = async (
    compiler: CompilerContext,
    theme: ThemeResource,
    getThemeTokens: ThemeTokensLoader,
): Promise<ThemeTokens | undefined> => {
    try {
        const loaded = await getThemeTokens(compiler, theme);
        return loaded?.tokens;
    } catch (err) {
        compiler.addError('project', (err as Error).message);
    }
};
