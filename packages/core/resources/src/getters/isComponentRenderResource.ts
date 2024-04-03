import { ComponentRenderResource, ComponentResource } from '@noodles-ui/core-resources';

export const isComponentRenderResource = (
    component: ComponentResource,
): ComponentRenderResource | undefined => {
    if ((component as ComponentRenderResource).render) {
        return component as ComponentRenderResource;
    }
};
