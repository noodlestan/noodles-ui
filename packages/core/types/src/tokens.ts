export type TokenMap = {
    [key: string]: string;
};

export type SurfaceTokenMap = {
    [key: string]: TokenMap;
};

export type NamedTokenResource = {
    name: string;
};

export type PatternedTokenResource = {
    pattern: string;
};

export type TokenResource = NamedTokenResource | PatternedTokenResource;
