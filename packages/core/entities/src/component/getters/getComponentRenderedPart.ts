import { ComponentImportPartResource } from '@noodles-ui/core-resources';

import { ComponentImportEntity, ComponentOwnEntity } from '../types';

export const getComponentRenderedPart = (
    component: ComponentOwnEntity,
    rendered?: ComponentImportEntity,
): ComponentImportPartResource | undefined => {
    const { from, name } = component.render;

    const { parts } = rendered ?? from;

    const part = parts.find(part => part.name === name);

    return part;
};
