import { ComponentRenderResource } from '@noodles-ui/core-resources';
import { LayoutFlexResource as LayoutFlexStyledResource } from '@noodles-ui/solidjs-styled';

export const LayoutFlexResource: ComponentRenderResource = {
    type: 'component',
    name: 'LayoutFlex',
    module: '@noodles-ui/lab-ui',
    render: {
        from: LayoutFlexStyledResource,
        name: 'LayoutFlex',
    },
    exposes: ['direction', 'style', 'children'],
};
