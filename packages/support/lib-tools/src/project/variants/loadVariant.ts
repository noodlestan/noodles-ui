import { ProjectContext, VariantContext } from '../../types/projects';

import { addVariant } from './addVariant';

export const loadVariant = (project: ProjectContext, context: VariantContext): void => {
    const { resource: variant } = context;
    const instance = structuredClone(variant);

    // if (variant.options) {
    //     variant.options.forEach(option => {
    //         variant.tokens?.forEach(token => {
    //             if ((token as NamedTokenResource).name) {
    //                 const t: TokenResource = {
    //                     ...token,
    //                     type: 'token',
    //                     name: (token as NamedTokenResource).name,
    //                     module: variant.module,
    //                 };
    //                 addToken(project, { resource: token, instance: t, public: true });
    //             } else if ((token as PatternedTokenResource).pattern) {
    //                 const t: TokenResource = {
    //                     ...token,
    //                     type: 'token',
    //                     name: (token as PatternedTokenResource).pattern,
    //                     module: variant.module,
    //                 };
    //                 addToken(project, { resource: token, instance: t, public: true });
    //             }
    //         });
    //     });
    // }

    addVariant(project, { ...context, instance });
};
