import { join } from 'path';

import { ThemeBuildContext } from '@noodles-ui/support-types';

import { capitalize } from '../../../util/string';

export const themeComponentFileName = (target: string, theme: ThemeBuildContext): string => {
    const name = capitalize(theme.entity.name) + 'Theme';
    return join(target, `/themes/${name}/${name}.tsx`);
};
