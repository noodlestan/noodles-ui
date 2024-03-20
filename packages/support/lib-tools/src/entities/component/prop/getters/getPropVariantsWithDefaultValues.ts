import { ComponentEntity, PropVariantEntity, PropVariantReference } from '@noodles-ui/core-types';

import { hasPropDefaultValue } from './hasPropDefaultValue';
import { isPropVariant } from './isPropVariant';

export const getPropVariantsWithDefaultValues = (
    entity: ComponentEntity,
): (PropVariantEntity | PropVariantReference)[] => {
    return Object.values(entity.props || {}).filter(
        prop => hasPropDefaultValue(prop) && isPropVariant(prop),
    ) as (PropVariantEntity | PropVariantReference)[];
};
