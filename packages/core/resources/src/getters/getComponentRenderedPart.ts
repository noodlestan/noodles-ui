import {
    ComponentImportPartResource,
    ComponentImportResource,
    ComponentOwnResource,
} from '../component';

export const getComponentRenderedPart = (
    component: ComponentOwnResource,
    rendered?: ComponentImportResource,
): ComponentImportPartResource | undefined => {
    const { from, name } = component.render;

    const { parts } = rendered ?? from;

    const part = parts.find(part => part.name === name);

    return part;
};
