import { PropEntity } from '@noodles-ui/core-types';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const isPropVariant = (prop: PropEntity): PropEntity | undefined => {
    return isPropVariantEntity(prop) || isPropVariantReference(prop);
};
