import { ThemeResource } from '@noodles-ui/core-resources';
import { ThemeTokens } from '@noodles-ui/core-types';

export type ThemeEntity = ThemeResource & {
    tokens: ThemeTokens;
};
