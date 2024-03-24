import { ComponentEntity } from '@noodles-ui/core-types';

export const componentScssModuleBaseName = (entity: ComponentEntity): string => {
    const name = entity.name;
    return `${name}.module.scss`;
};
