import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';

import { addToken } from './addToken';

export const loadTokens = (project: ProjectContext, meta: ProjectResource): void => {
    meta.variants.forEach(variant => {
        if (variant.options) {
            variant.options.forEach(option => {
                variant.tokens?.forEach(token => {
                    addToken(token, option, project, { public: true });
                });
            });
        }
    });

    // meta.components.forEach(components => {
    //     ...
    // });
};
