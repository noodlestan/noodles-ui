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
    vars: string[];
};

export type TokenResource = NamedTokenResource | PatternedTokenResource;
