import { RenderedComponentResource } from '@noodles-ui/core-types';

const camelCase = (str: string) => str.replace(/-([a-z])/gi, match => match[1].toUpperCase());

export const renderedComponentAlias = (rendered: RenderedComponentResource): string => {
    const { from, name = '' } = rendered;
    return camelCase(from.module.replace(/[^\w]/g, '-') + '-' + name);
};
