import { NamedTokenResource, TokenVars } from '@noodles-ui/core-resources';

export type NamedTokenEntity = NamedTokenResource & {
    name: string;
    surface: boolean;
};

export type PatternedTokenEntity = NamedTokenEntity & {
    pattern: string;
    vars: TokenVars;
};

export type TokenEntity = NamedTokenEntity | PatternedTokenEntity;
