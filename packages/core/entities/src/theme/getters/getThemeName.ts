import { ThemeResource } from '@noodles-ui/core-resources';

import { capitalize } from '../../util/capitalize';
import { safeName } from '../../util/safeName';

export function getThemeName(entity: ThemeResource): string {
    return capitalize(safeName(entity.name));
}
