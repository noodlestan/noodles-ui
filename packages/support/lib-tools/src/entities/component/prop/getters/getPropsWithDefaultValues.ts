import { ComponentEntity, PropEntity } from '@noodles-ui/core-types';

import { hasPropDefaultValue } from './hasPropDefaultValue';

export const getPropsWithDefaultValues = (entity: ComponentEntity): PropEntity[] =>
    Object.values(entity.props).filter(prop => hasPropDefaultValue(prop));
