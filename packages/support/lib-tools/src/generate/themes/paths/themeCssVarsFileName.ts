import { join } from 'path';

import { ThemeBuildContext } from '@noodles-ui/support-types';

import { getThemeIdentifier } from '../../../entities/theme/getters/getThemeIdentifier';

export const themeCssVarsFileName = (target: string, theme: ThemeBuildContext): string => {
    const name = getThemeIdentifier(theme.entity);
    return join(target, `/themes/${name}/${name}.tokens.css`);
};
