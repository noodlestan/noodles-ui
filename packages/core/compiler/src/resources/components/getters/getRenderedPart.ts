import {
    ComponentImportPartResource,
    ComponentImportResource,
    ComponentOwnResource,
} from '@noodles-ui/core-resources';

export const getRenderedPart = (
    component: ComponentOwnResource,
    rendered?: ComponentImportResource,
): ComponentImportPartResource | undefined => {
    const { from, name } = component.render;

    const { parts } = rendered ?? from;

    const part = parts.find(part => part.name === name);

    return part;
};
