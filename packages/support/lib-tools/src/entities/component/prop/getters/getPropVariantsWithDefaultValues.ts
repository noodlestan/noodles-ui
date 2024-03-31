import { ComponentEntity, PropEntity } from '@noodles-ui/core-types';

import { hasPropDefaultValue } from './hasPropDefaultValue';
import { isPropVariant } from './isPropVariant';

export const getPropVariantsWithDefaultValues = (entity: ComponentEntity): PropEntity[] => {
    return Object.values(entity.props || {}).filter(
        prop => hasPropDefaultValue(prop) && isPropVariant(prop),
    ) as PropEntity[];
};
