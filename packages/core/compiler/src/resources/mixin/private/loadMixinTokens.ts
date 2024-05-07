import { MixinContext, MixinEntity, TokenEntity } from '@noodles-ui/core-entities';
import {
    InlineNamedTokenResource,
    InlinePatternedTokenResource,
    InlineTokenResource,
    NamedTokenResource,
    PatternedTokenResource,
    TokenResource,
    TokenVars,
    getResourceTypedKey,
} from '@noodles-ui/core-resources';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { CompilerContext } from '../../../types';
import { loadToken } from '../../token/loadToken';

const loadNamedToken = (
    compiler: CompilerContext,
    context: MixinContext,
    mixin: MixinEntity,
    token: NamedTokenResource,
): TokenEntity | undefined => {
    const newResource: TokenResource = {
        ...token,
        type: 'token',
        name: token.name,
        module: mixin.module,
    };

    const newContext = newResourceContextPublicWithConsumer<TokenResource>(context, newResource);

    return loadToken(compiler, newContext);
};

const loadPatternToken = (
    compiler: CompilerContext,
    context: MixinContext,
    mixin: MixinEntity,
    token: PatternedTokenResource,
    tokenVars: TokenVars[],
): TokenEntity[] => {
    return tokenVars
        .map(vars => {
            const newResource: PatternedTokenResource = {
                ...token,
                type: 'token',
                module: mixin.module,
                pattern: token.pattern,
            };

            const newContext = newResourceContextPublicWithConsumer<TokenResource>(
                context,
                newResource,
            );

            return loadToken(compiler, newContext, vars);
        })
        .filter(Boolean) as TokenEntity[];
};

const addVar = (tokenVars: TokenVars[], key: string, value: string | string[]): TokenVars[] => {
    const values = typeof value === 'string' ? [value] : value;

    return values.flatMap(value => {
        return tokenVars.map(vars => ({ ...vars, [key]: value }));
    }, []);
};

const makeMatrix = (mixin: MixinEntity): TokenVars[] => {
    const { vars = {} } = mixin;

    const keys = Object.keys(vars);
    const tokenVars: TokenVars[] = [{}];

    return keys.reduce((acc, key) => {
        return addVar(acc, key, vars[key]);
    }, tokenVars);
};

const loadMixinTokenTokens = (
    compiler: CompilerContext,
    context: MixinContext,
    mixin: MixinEntity,
    token: InlineTokenResource,
): Array<TokenEntity | undefined> => {
    const { module } = mixin;
    const type = 'token';
    if ((token as InlineNamedTokenResource).name) {
        const resource: NamedTokenResource = {
            ...(token as InlineNamedTokenResource),
            type,
            module,
            surface: mixin.surface,
        };

        return [loadNamedToken(compiler, context, mixin, resource)];
    }
    if ((token as InlinePatternedTokenResource).pattern) {
        const tokenVars = makeMatrix(mixin);
        const resource: PatternedTokenResource = {
            ...(token as InlinePatternedTokenResource),
            type,
            module,
            surface: mixin.surface || false,
        };
        return loadPatternToken(compiler, context, mixin, resource, tokenVars);
    }
    compiler.addError(mixin, `Could not resolve token "${JSON.stringify(token)}".`);
    return [];
};

const loadMixinToken = (
    compiler: CompilerContext,
    context: MixinContext,
    mixin: MixinEntity,
    token: InlineTokenResource,
): void => {
    const tokens = loadMixinTokenTokens(compiler, context, mixin, token);
    const filtered = tokens.filter(token => Boolean(token)) as TokenEntity[];
    filtered.forEach(token => context.consumes.add(getResourceTypedKey(token)));
};

export const loadMixinTokens = (
    compiler: CompilerContext,
    context: MixinContext,
    mixin: MixinEntity,
): void => {
    mixin.tokens?.forEach(token => loadMixinToken(compiler, context, mixin, token));
};
