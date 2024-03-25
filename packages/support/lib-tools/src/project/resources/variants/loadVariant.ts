import {
    InlineNamedTokenResource,
    InlinePatternedTokenResource,
    InlineTokenResource,
    MixinResource,
    NamedTokenResource,
    PatternedTokenResource,
    TokenEntity,
    TokenResource,
    TokenVars,
    VariantEntity,
    VariantInlineExtendResource,
    VariantOwnResource,
    VariantResource,
    VariantVars,
} from '@noodles-ui/core-types';
import { NUI, ProjectContext, VariantContext } from '@noodles-ui/support-types';

import { newResourceContextPublicWithConsumer } from '../../context/newResourceContextPublicWithConsumer';
import { newResourceContextWithConsumer } from '../../context/newResourceContextWithConsumer';
import { getResourceKey } from '../getters/getResourceKey';
import { getResourceTypedKey } from '../getters/getResourceTypedKey';
import { loadMixin } from '../mixins/loadMixin';
import { loadToken } from '../tokens/loadToken';

import { isVariantExtendResource } from './getters/isVariantExtendResource';
import { isVariantOwnResource } from './getters/isVariantOwnResource';
import { addVariant } from './private/addVariant';
import { extendVariantExtends } from './private/extendVariantExtends';

const loadVariantMixin = (
    project: ProjectContext,
    context: VariantContext,
    variant: VariantOwnResource,
    // vars?: VariantVars,
): MixinResource | undefined => {
    if (variant.mixin) {
        const newResource = {
            ...structuredClone(variant.mixin),
            type: NUI.mixin as 'mixin',
            module: variant.module,
        };
        const newContext = newResourceContextPublicWithConsumer<MixinResource>(
            context,
            newResource,
        );
        return loadMixin(project, newContext);
    }
};

const loadNamedToken = (
    project: ProjectContext,
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

    return loadToken(project, newContext);
};

const loadPatternToken = (
    project: ProjectContext,
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
                pattern: token.pattern,
                module: variant.module,
            };

            const newContext = newResourceContextPublicWithConsumer<TokenResource>(
                context,
                newResource,
            );

            return loadToken(project, newContext, vars);
        })
        .filter(Boolean) as TokenEntity[];
};

const addVar = (tokenVars: TokenVars[], key: string, value: string | string[]): TokenVars[] => {
    const values = typeof value === 'string' ? [value] : value;

    return values.flatMap(value => {
        return tokenVars.map(vars => ({ ...vars, [key]: value }));
    }, []);
};

// [{}];
// [{option:foo}, {option:bar}];
// [{option:foo, family:1}, {option:bar, family:1}];

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
    project: ProjectContext,
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

        return [loadNamedToken(project, context, variant, resource)];
    }
    if ((token as InlinePatternedTokenResource).pattern) {
        const tokenVars = makeMatrix(variant);
        const resource: PatternedTokenResource = {
            ...(token as InlinePatternedTokenResource),
            type,
            module,
            surface: variant.surface || false,
        };
        return loadPatternToken(project, context, variant, resource, tokenVars);
    }
    project.addDiagnostic(variant, `Could not resolve token "${JSON.stringify(token)}".`);
    return [];
};

const loadVariantToken = (
    project: ProjectContext,
    context: VariantContext,
    variant: VariantEntity,
    token: InlineTokenResource,
): void => {
    const tokens = loadVariantTokenTokens(project, context, variant, token);
    const filtered = tokens.filter(token => Boolean(token)) as TokenEntity[];
    filtered.forEach(token => context.consumes.add(getResourceTypedKey(token)));
};

const loadVariantTokens = (
    project: ProjectContext,
    context: VariantContext,
    variant: VariantEntity,
): void => {
    variant.tokens?.forEach(token => loadVariantToken(project, context, variant, token));
};

const loadVariantOwnResource = (
    project: ProjectContext,
    context: VariantContext,
    variant: VariantOwnResource,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const actualVars = { ...variant.vars, ...vars };

    const actualMixin = loadVariantMixin(project, context, variant);
    const actualOptions = variant.options || [];

    const entity = {
        ...structuredClone(variant),
        type: NUI.variant as 'variant',
        options: actualOptions,
        mixin: actualMixin,
        vars: actualVars,
    };

    if (context.public) {
        loadVariantTokens(project, context, entity);
    }

    return addVariant(project, context, entity);
};

const loadExtendedVariant = (
    project: ProjectContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
): VariantEntity | undefined => {
    const newContext = newResourceContextWithConsumer<VariantResource>(
        context,
        extendVariant.extend,
    );
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return loadVariant(project, newContext) as VariantEntity;
};

const loadVariantExtend = (
    project: ProjectContext,
    context: VariantContext,
    extendVariant: VariantInlineExtendResource,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const parent = loadExtendedVariant(project, context, extendVariant);
    if (!parent) {
        const name = getResourceKey(extendVariant);
        project.addDiagnostic(extendVariant, `Could not load extended variant "${name}".`);
        return;
    }

    const entity = extendVariantExtends(project, context, extendVariant, parent, vars);
    if (!entity) {
        project.addDiagnostic(extendVariant, 'Could not load variant');
        return;
    }

    if (context.public) {
        loadVariantTokens(project, context, entity);
    }

    return addVariant(project, context, entity);
};

export const loadVariant = (
    project: ProjectContext,
    context: VariantContext,
    vars?: VariantVars,
): VariantEntity | undefined => {
    const { resource } = context;

    const variantExtend = isVariantExtendResource(resource);
    if (variantExtend) {
        return loadVariantExtend(project, context, variantExtend, vars);
    }

    const variant = isVariantOwnResource(resource);
    if (variant) {
        return loadVariantOwnResource(project, context, variant, vars);
    }

    throw new Error('Type error: could not match variant resource by shape');
};
