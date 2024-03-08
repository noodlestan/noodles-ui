import {
    ComponentImportResource,
    PropInlineResource,
    VariantInlineResource,
} from '@noodles-ui/core-types';

const tag: VariantInlineResource = {
    type: 'variant',
    name: 'TextTag',
    options: ['p'],
    defaultValue: 'p',
};

const children: PropInlineResource = {};

export const TextResource: ComponentImportResource = {
    type: 'component',
    name: 'Text',
    module: '@noodles-ui/core-unstyled',
    parts: [
        {
            name: 'Text',
            props: {
                tag,
                children,
            },
        },
    ],
};
