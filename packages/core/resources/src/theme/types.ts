import { ColourSchemeName } from '@noodles-ui/core-types';

import { Resource } from '../types';

export type ThemeResource = Resource<'theme'> & {
    extend: ThemeResource[];
    mode: ColourSchemeName;
};
