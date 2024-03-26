import { ThemeResource, ThemeTokens } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

export type ThemeTokensSchema = {
    tokens: ThemeTokens;
};

export type ThemeTokensLoader = (
    project: ProjectContext,
    theme: ThemeResource,
) => Promise<ThemeTokensSchema | undefined>;

export type BuildOptions = {
    themeTokensLoader?: ThemeTokensLoader;
    interactive?: {
        expand?: string[];
        hints?: boolean;
    };
};
