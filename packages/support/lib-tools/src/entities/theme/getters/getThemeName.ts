import { ThemeResource } from '@noodles-ui/core-types';

import { capitalize, safeName } from '../../../util/string';

export function getThemeName(entity: ThemeResource): string {
    return capitalize(safeName(entity.name));
}
