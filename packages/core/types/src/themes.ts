import { ColourSchemeName } from './color-schemes';

export type ThemeResource = {
    name: string;
    extend: ThemeResource[];
    mode: ColourSchemeName;
};
