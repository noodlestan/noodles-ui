import { ComponentImportPartResource } from '@noodles-ui/core-resources';

import { ComponentImportEntity, ComponentRenderEntity } from '../types';

export const getComponentRenderedPart = (
    component: ComponentRenderEntity,
    rendered?: ComponentImportEntity,
): ComponentImportPartResource | undefined => {
    const { from, name } = component.render;

    const { parts } = rendered ?? from;

    const part = parts.find(part => part.name === name);

    return part;
};
