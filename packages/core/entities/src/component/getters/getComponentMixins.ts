import { MixinResource } from '@noodles-ui/core-resources';

import { ComponentRenderEntity } from '../types';

export const getComponentMixins = (entity: ComponentRenderEntity): MixinResource[] => {
    return entity.use;
};
