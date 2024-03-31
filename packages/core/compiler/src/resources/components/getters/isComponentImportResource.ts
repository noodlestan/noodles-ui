import { ComponentImportResource, ComponentResource } from '@noodles-ui/core-resources';

export const isComponentImportResource = (
    component: ComponentResource,
): ComponentImportResource | undefined => {
    if ((component as ComponentImportResource).parts) {
        return component as ComponentImportResource;
    }
};
