import {
    NamedTokenResource,
    PatternedTokenResource,
    ProjectResource,
    TokenResource,
} from '@noodles-ui/core-types';

import { logInfo } from '../../cli/logInfo';
import { ProjectContext } from '../../types/projects';

import { addToken } from './addToken';

export const loadTokens = (project: ProjectContext, meta: ProjectResource): void => {
    logInfo('loading tokens...');

    meta.variants.forEach(variant => {
        if (variant.options) {
            variant.options.forEach(option => {
                variant.tokens?.forEach(token => {
                    if ((token as NamedTokenResource).name) {
                        const t: TokenResource = {
                            ...token,
                            type: 'token',
                            name: (token as NamedTokenResource).name,
                            module: variant.module,
                        };
                        addToken(project, t, option, { public: true });
                    } else if ((token as PatternedTokenResource).pattern) {
                        const t: TokenResource = {
                            ...token,
                            type: 'token',
                            name: (token as PatternedTokenResource).pattern,
                            module: variant.module,
                        };
                        addToken(project, t, option, { public: true });
                    }
                });
            });
        }
    });

    // meta.components.forEach(components => {
    //     ...
    // });

    console.info('');
};
