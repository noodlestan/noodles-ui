import {
    InlineNamedTokenResource,
    InlinePatternedTokenResource,
    InlineTokenResource,
    NamedTokenResource,
    PatternedTokenResource,
    TokenEntity,
    TokenResource,
    TokenVars,
    VariantEntity,
    VariantOwnResource,
} from '@noodles-ui/core-types';
import { CompilerContext, VariantContext } from '@noodles-ui/support-types';

import { newResourceContextPublicWithConsumer } from '../../../context/newResourceContextPublicWithConsumer';
import { getResourceTypedKey } from '../../getters/getResourceTypedKey';
import { loadToken } from '../../tokens/loadToken';

const loadNamedToken = (
    compiler: CompilerContext,
    context: VariantContext,
    variant: VariantOwnResource,
    token: NamedTokenResource,
): TokenEntity | undefined => {
    const newResource: TokenResource = {
        ...token,
        type: 'token',
        name: token.name,
        module: variant.module,
    };

    const newContext = newResourceContextPublicWithConsumer<TokenResource>(context, newResource);

    return loadToken(compiler, newContext);
};

const loadPatternToken = (
    compiler: CompilerContext,
    context: VariantContext,
    variant: VariantOwnResource,
    token: PatternedTokenResource,
    tokenVars: TokenVars[],
): TokenEntity[] => {
    return tokenVars
        .map(vars => {
            const newResource: PatternedTokenResource = {
                ...token,
                type: 'token',
                module: variant.module,
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

const makeMatrix = (variant: VariantOwnResource): TokenVars[] => {
    const { options, vars = {} } = variant;

    const actualVars = { ...vars };
    if (options && options.length) {
        actualVars.option = options;
    }

    const keys = Object.keys(actualVars);
    const tokenVars: TokenVars[] = [{}];

    return keys.reduce((acc, key) => {
        return addVar(acc, key, actualVars[key]);
    }, tokenVars);
};

const loadVariantTokenTokens = (
    compiler: CompilerContext,
    context: VariantContext,
    variant: VariantEntity,
    token: InlineTokenResource,
): Array<TokenEntity | undefined> => {
    const { module } = variant;
    const type = 'token';
    if ((token as InlineNamedTokenResource).name) {
        const resource: NamedTokenResource = {
            ...(token as InlineNamedTokenResource),
            type,
            module,
            surface: variant.surface,
        };

        return [loadNamedToken(compiler, context, variant, resource)];
    }
    if ((token as InlinePatternedTokenResource).pattern) {
        const tokenVars = makeMatrix(variant);
        const resource: PatternedTokenResource = {
            ...(token as InlinePatternedTokenResource),
            type,
            module,
            surface: variant.surface || false,
        };
        return loadPatternToken(compiler, context, variant, resource, tokenVars);
    }
    compiler.addError(variant, `Could not resolve token "${JSON.stringify(token)}".`);
    return [];
};

const loadVariantToken = (
    compiler: CompilerContext,
    context: VariantContext,
    variant: VariantEntity,
    token: InlineTokenResource,
): void => {
    const tokens = loadVariantTokenTokens(compiler, context, variant, token);
    const filtered = tokens.filter(token => Boolean(token)) as TokenEntity[];
    filtered.forEach(token => context.consumes.add(getResourceTypedKey(token)));
};

export const loadVariantTokens = (
    compiler: CompilerContext,
    context: VariantContext,
    variant: VariantEntity,
): void => {
    variant.tokens?.forEach(token => loadVariantToken(compiler, context, variant, token));
};
