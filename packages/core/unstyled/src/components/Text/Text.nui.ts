import { ComponentImportResource, PropInlineResource } from '@noodles-ui/core-types';

const tag: PropInlineResource = {
    options: ['p'],
    defaultOption: 'p',
};

export const TextResource: ComponentImportResource = {
    type: 'component',
    name: 'Text',
    module: '@noodles-ui/core-unstyled',
    parts: [
        {
            name: 'Text',
            props: {
                tag,
            },
        },
    ],
};
