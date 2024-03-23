import { ThemeResource } from '@noodles-ui/core-types';

import { getThemeName } from './getThemeName';

export function getThemeIdentifier(entity: ThemeResource): string {
    return getThemeName(entity) + 'Theme';
}
