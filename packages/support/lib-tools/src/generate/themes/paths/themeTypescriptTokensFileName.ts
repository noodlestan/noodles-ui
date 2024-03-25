import { join } from 'path';

import { ThemeBuildContext } from '@noodles-ui/support-types';

import { getThemeIdentifier } from '../../../entities/theme/getters/getThemeIdentifier';

export const themeTypescriptTokensFileName = (target: string, theme: ThemeBuildContext): string => {
    const name = getThemeIdentifier(theme.entity);
    return join(target, `/themes/${name}/${name}.tokens.tsx`);
};
