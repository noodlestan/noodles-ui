import {
    ComponentImportResource,
    PropInlineResource,
    VariantInlineResource,
} from '@noodles-ui/core-types';

const tag: VariantInlineResource = {
    type: 'variant',
    name: 'HeadingTag',
    options: ['h1', 'h2', 'h3', 'h4', 'p', 'span'],
    defaultValue: 'p',
};

const children: PropInlineResource = {};

export const HeadingResource: ComponentImportResource = {
    type: 'component',
    name: 'Heading',
    module: '@noodles-ui/core-unstyled',
    parts: [
        {
            name: 'Heading',
            props: {
                tag,
                children,
            },
        },
    ],
};
