import {
    ComponentImportResource,
    PropInlineResource,
    VariantInlineResource,
} from '@noodles-ui/core-types';

const children: PropInlineResource = {};
const tag: VariantInlineResource = {
    type: 'variant',
    name: 'TextTag',
    options: ['p'],
    defaultValue: 'p',
};
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
                children,
                tag,
                classList,
                style,
            },
        },
    ],
};
