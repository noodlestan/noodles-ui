import { ComponentEntity, PropEntity } from '../..';

import { hasPropDefaultValue } from './hasPropDefaultValue';
import { isPropVariant } from './isPropVariant';

export const getPropVariantsWithDefaultValues = (entity: ComponentEntity): PropEntity[] => {
    return Object.values(entity.props || {}).filter(
        prop => hasPropDefaultValue(prop) && isPropVariant(prop),
    ) as PropEntity[];
};
