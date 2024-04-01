import { PatternedTokenEntity, TokenContext, TokenEntity } from '@noodles-ui/core-entities';
import { PatternedTokenResource, TokenResource, TokenVars } from '@noodles-ui/core-resources';

import { CompilerContext } from '../../types';

import { addToken } from './private/addToken';

const makeTokenName = (token: TokenResource, tokenVars: TokenVars = {}): string => {
    if ('name' in token) {
        return token.name;
    }

    const pattern = (token as PatternedTokenResource).pattern;

    return Object.keys(tokenVars).reduce(
        (acc, key) => acc.replace(`#{${key}}`, tokenVars[key]),
        pattern,
    );
};

export const loadToken = (
    compiler: CompilerContext,
    context: TokenContext,
    tokenVars?: TokenVars,
): TokenEntity | undefined => {
    const { resource: token } = context;

    const name = makeTokenName(token, tokenVars);

    const entity: TokenEntity = {
        name,
        surface: Boolean(token.surface),
        ...structuredClone(token),
    };

    if ((entity as PatternedTokenEntity).pattern) {
        (entity as PatternedTokenEntity).vars = tokenVars || {};
    }

    return addToken(compiler, context, entity);
};
