import { ComponentEntity } from '@noodles-ui/core-entities';

export const componentScssModuleBaseName = (entity: ComponentEntity): string => {
    const name = entity.name;
    return `${name}.module.scss`;
};
