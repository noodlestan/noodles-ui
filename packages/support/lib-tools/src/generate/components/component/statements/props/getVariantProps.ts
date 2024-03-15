import { ComponentEntity, PropVariantEntity, PropVariantReference } from '@noodles-ui/core-types';

import { isPropVariant } from './isPropVariant';

export const getVariantProps = (
    entity: ComponentEntity,
): (PropVariantEntity | PropVariantReference)[] => {
    return Object.values(entity.props || {}).filter(isPropVariant) as (
        | PropVariantEntity
        | PropVariantReference
    )[];
};
