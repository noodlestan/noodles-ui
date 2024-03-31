import { ComponentExtendResource, ComponentResource } from '@noodles-ui/core-types';

export const isComponentExtendResource = (
    component: ComponentResource,
): ComponentExtendResource | undefined => {
    if ((component as ComponentExtendResource).extend) {
        return component as ComponentExtendResource;
    }
};
