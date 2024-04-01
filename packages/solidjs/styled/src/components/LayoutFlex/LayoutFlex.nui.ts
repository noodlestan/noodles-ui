import {
    ComponentImportResource,
    PropInlineResource,
    VariantInlineResource,
} from '@noodles-ui/core-resources';

const direction: VariantInlineResource = {
    type: 'variant',
    name: 'FlexDirection',
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
    defaultValue: 'row',
};
const children: PropInlineResource = {};
const classList: PropInlineResource = {};
const style: PropInlineResource = {};

export const LayoutFlexResource: ComponentImportResource = {
    type: 'component',
    name: 'LayoutFlex',
    module: '@noodles-ui/solidjs-styled',
    parts: [
        {
            name: 'LayoutFlex',
            props: {
                direction,
                children,
                classList,
                style,
            },
        },
    ],
};
