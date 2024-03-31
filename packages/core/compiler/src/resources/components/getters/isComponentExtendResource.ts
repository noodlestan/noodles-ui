import { ComponentExtendResource, ComponentResource } from '@noodles-ui/core-resources';

export const isComponentExtendResource = (
    component: ComponentResource,
): ComponentExtendResource | undefined => {
    if ((component as ComponentExtendResource).extend) {
        return component as ComponentExtendResource;
    }
};
