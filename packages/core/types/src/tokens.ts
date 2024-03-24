import { Resource } from './resource';

export type TokenMap = {
    [key: string]: string;
};

export type SurfaceTokenMap = {
    [key: string]: TokenMap;
};

export type NamedTokenResource = Resource<'token'>;

export type PatternedTokenResource = Omit<Resource<'token'>, 'name'> & {
    pattern: string;
    params: string[];
};

export type TokenResource = NamedTokenResource | PatternedTokenResource;

export type TokenVars = {
    [key: string]: string | string[];
};

export type TokenEntity = TokenResource & {
    surface: boolean;
    vars: TokenVars;
};
