import { MixinResource } from '@noodles-ui/core-resources';

import { ComponentOwnEntity } from '../types';

export const getComponentMixins = (entity: ComponentOwnEntity): MixinResource[] => {
    return entity.use;
};
