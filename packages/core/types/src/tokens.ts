import { Resource } from './resource';

export type TokenMap = {
    [key: string]: string;
};

export type SurfaceTokenMap = {
    [key: string]: TokenMap;
};

export type NamedTokenResource = Resource<'token'> & {
    surface?: boolean;
};

export type PatternedTokenResource = Omit<NamedTokenResource, 'name'> & {
    pattern: string;
};

export type InlineNamedTokenResource = Omit<NamedTokenResource, 'type' | 'module' | 'surface'>;

export type InlinePatternedTokenResource = Omit<
    PatternedTokenResource,
    'type' | 'module' | 'surface'
>;

export type InlineTokenResource = InlineNamedTokenResource | InlinePatternedTokenResource;

export type TokenResource = NamedTokenResource | PatternedTokenResource;

export type TokenVars = {
    [key: string]: string;
};

export type NamedTokenEntity = NamedTokenResource & {
    name: string;
    surface: boolean;
};

export type PatternedTokenEntity = NamedTokenEntity & {
    pattern: string;
    vars: TokenVars;
};

export type TokenEntity = NamedTokenEntity | PatternedTokenEntity;
