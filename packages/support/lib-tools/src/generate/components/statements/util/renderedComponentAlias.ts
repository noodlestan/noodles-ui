import { RenderedComponentResource } from '@noodles-ui/core-types';

import { camelCase } from '../../../../util/string';

export const renderedComponentAlias = (rendered: RenderedComponentResource): string => {
    const { from, name = '' } = rendered;
    return camelCase(from.module.replace(/[^\w]/g, '-') + '-' + name);
};
