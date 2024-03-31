import {
    ComponentImportResource,
    PropInlineResource,
    VariantInlineResource,
} from '@noodles-ui/core-resources';

const children: PropInlineResource = {};
const tag: VariantInlineResource = {
    type: 'variant',
    name: 'HeadingTag',
    options: ['h1', 'h2', 'h3', 'h4', 'p', 'span'],
    defaultValue: 'h1',
};
const level: VariantInlineResource = {
    type: 'variant',
    name: 'HeadingLevel',
    options: ['1', '2', '3', '4'],
    defaultValue: '1',
};
const classList: PropInlineResource = {};
const style: PropInlineResource = {};

export const HeadingResource: ComponentImportResource = {
    type: 'component',
    name: 'Heading',
    module: '@noodles-ui/core-unstyled',
    parts: [
        {
            name: 'Heading',
            props: {
                level,
                tag,
                children,
                classList,
                style,
            },
        },
    ],
};
