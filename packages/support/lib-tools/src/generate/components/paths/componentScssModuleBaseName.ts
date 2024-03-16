import { ComponentResource } from '@noodles-ui/core-types';

export const componentScssModuleBaseName = (entity: ComponentResource): string => {
    const name = entity.name;
    return `component.${name}.module.scss`;
};
