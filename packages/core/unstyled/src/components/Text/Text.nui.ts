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
const classList: PropInlineResource = {};
const style: PropInlineResource = {};

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
                classList,
                style,
            },
        },
    ],
};
