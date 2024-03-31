import { ThemeResource } from '@noodles-ui/core-resources';

import { getThemeName } from './getThemeName';

export function getThemeIdentifier(entity: ThemeResource): string {
    return getThemeName(entity) + 'Theme';
}
