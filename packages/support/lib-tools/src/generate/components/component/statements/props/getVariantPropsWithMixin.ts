import { ComponentEntity, PropVariantEntity, PropVariantReference } from '@noodles-ui/core-types';

import { hasPropVariantMixin } from './hasPropVariantMixin';

export const getVariantPropsWithMixin = (
    entity: ComponentEntity,
): (PropVariantEntity | PropVariantReference)[] => {
    return Object.values(entity.props || {}).filter(hasPropVariantMixin) as (
        | PropVariantEntity
        | PropVariantReference
    )[];
};
