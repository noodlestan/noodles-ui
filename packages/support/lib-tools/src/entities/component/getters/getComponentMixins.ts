import { ComponentOwnEntity, MixinResource } from '@noodles-ui/core-types';

export const getComponentMixins = (entity: ComponentOwnEntity): MixinResource[] => {
    return entity.use;
};
