import { RenderedComponentResource } from '@noodles-ui/core-resources';

import { camelCase } from '../../../../../util/camelCase';

export const renderedComponentAlias = (rendered: RenderedComponentResource): string => {
    const { from, name = '' } = rendered;
    return camelCase(from.module.replace(/[^\w]/g, '-') + '-' + name);
};
