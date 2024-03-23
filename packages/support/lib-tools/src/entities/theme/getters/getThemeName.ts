import { ThemeResource } from '@noodles-ui/core-types';

import { capitalize } from '../../../util/string';

export function getThemeName(entity: ThemeResource): string {
    return capitalize(entity.name);
}
