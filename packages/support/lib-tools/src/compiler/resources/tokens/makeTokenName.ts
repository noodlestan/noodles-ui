import { PatternedTokenResource, TokenResource, TokenVars } from '@noodles-ui/core-types';

export const makeTokenName = (token: TokenResource, tokenVars: TokenVars = {}): string => {
    if ('name' in token) {
        return token.name;
    }

    const pattern = (token as PatternedTokenResource).pattern;

    return Object.keys(tokenVars).reduce(
        (acc, key) => acc.replace(`#{${key}}`, tokenVars[key]),
        pattern,
    );
};
