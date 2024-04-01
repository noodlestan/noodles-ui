import { ComponentOwnResource } from '@noodles-ui/core-resources';
import { LayoutFlexResource as LayoutFlexStyledResource } from '@noodles-ui/solidjs-styled';

export const LayoutFlexResource: ComponentOwnResource = {
    type: 'component',
    name: 'LayoutFlex',
    module: '@noodles-ui/lab-ui',
    exposes: ['direction', 'style', 'children'],
    render: {
        from: LayoutFlexStyledResource,
        name: 'LayoutFlex',
    },
};
