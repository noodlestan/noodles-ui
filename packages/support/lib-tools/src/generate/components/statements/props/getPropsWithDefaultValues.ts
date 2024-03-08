import { ComponentInstance, PropInstance } from '@noodles-ui/core-types';

import { hasPropDefaultValue } from './hasPropDefaultValue';

export const getPropsWithDefaultValues = (instance: ComponentInstance): PropInstance[] =>
    Object.values(instance.props).filter(prop => hasPropDefaultValue(prop));
