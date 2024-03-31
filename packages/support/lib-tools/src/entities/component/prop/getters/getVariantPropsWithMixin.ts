import { ComponentEntity, PropEntity } from '@noodles-ui/core-types';

import { hasPropVariantMixin } from './hasPropVariantMixin';

export const getVariantPropsWithMixin = (entity: ComponentEntity): PropEntity[] => {
    return Object.values(entity.props || {}).filter(hasPropVariantMixin) as PropEntity[];
};
