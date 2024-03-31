import { Resource } from '../types';

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
