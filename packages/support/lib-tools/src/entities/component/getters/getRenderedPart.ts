import {
    ComponentImportEntity,
    ComponentImportPartResource,
    ComponentOwnEntity,
} from '@noodles-ui/core-types';

export const getRenderedPart = (
    component: ComponentOwnEntity,
    rendered?: ComponentImportEntity,
): ComponentImportPartResource | undefined => {
    const { from, name } = component.render;

    const { parts } = rendered ?? from;

    const part = parts.find(part => part.name === name);

    return part;
};
