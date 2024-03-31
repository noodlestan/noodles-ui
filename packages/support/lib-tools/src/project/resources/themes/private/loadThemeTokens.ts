import { ThemeResource, ThemeTokens } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { ThemeTokensLoader } from '../../../../build/types';

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
