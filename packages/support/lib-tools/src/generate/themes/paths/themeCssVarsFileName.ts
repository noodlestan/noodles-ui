import { join } from 'path';

import { ThemeBuildContext, getThemeIdentifier } from '@noodles-ui/core-entities';

export const themeCssVarsFileName = (target: string, theme: ThemeBuildContext): string => {
    const name = getThemeIdentifier(theme.entity);
    return join(target, `/themes/${name}/${name}.tokens.css`);
};
