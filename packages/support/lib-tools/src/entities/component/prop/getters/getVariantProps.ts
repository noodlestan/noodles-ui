import { ComponentEntity, PropEntity } from '@noodles-ui/core-types';

import { isPropVariant } from './isPropVariant';

export const getVariantProps = (entity: ComponentEntity): PropEntity[] => {
    return Object.values(entity.props || {}).filter(isPropVariant) as PropEntity[];
};
