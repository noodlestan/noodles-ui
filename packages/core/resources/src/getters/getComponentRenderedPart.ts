import {
    ComponentImportPartResource,
    ComponentImportResource,
    ComponentRenderResource,
} from '../component';

export const getComponentRenderedPart = (
    component: ComponentRenderResource,
    rendered?: ComponentImportResource,
): ComponentImportPartResource | undefined => {
    const { from, name } = component.render;

    const { parts } = rendered ?? from;

    const part = parts.find(part => part.name === name);

    return part;
};
