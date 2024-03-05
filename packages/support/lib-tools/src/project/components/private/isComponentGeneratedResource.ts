import { ComponentGeneratedResource, ComponentResource } from '@noodles-ui/core-types';

export const isComponentGeneratedResource = (
    component: ComponentResource,
): ComponentGeneratedResource | undefined => {
    if ((component as ComponentGeneratedResource).generated) {
        return component as ComponentGeneratedResource;
    }
};
