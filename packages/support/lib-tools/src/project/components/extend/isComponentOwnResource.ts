import { ComponentOwnResource, ComponentResource } from '@noodles-ui/core-types';

export const isComponentOwnResource = (
    component: ComponentResource,
): ComponentOwnResource | undefined => {
    if ((component as ComponentOwnResource).render) {
        return component as ComponentOwnResource;
    }
};
