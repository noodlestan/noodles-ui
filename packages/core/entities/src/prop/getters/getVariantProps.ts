import { ComponentEntity, PropEntity } from '../..';

import { isPropVariant } from './isPropVariant';

export const getVariantProps = (entity: ComponentEntity): PropEntity[] => {
    return Object.values(entity.props || {}).filter(isPropVariant) as PropEntity[];
};
