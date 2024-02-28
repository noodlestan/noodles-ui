import { ColourSchemeName } from './color-schemes';
import { Resource } from './resource';

export type ThemeResource = Resource<'theme'> & {
    extend: ThemeResource[];
    mode: ColourSchemeName;
};
