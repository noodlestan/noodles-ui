import { PropEntity, PropVariantEntity, PropVariantReference } from '@noodles-ui/core-types';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const isPropVariant = (
    prop: PropEntity,
): PropVariantEntity | PropVariantReference | undefined => {
    return isPropVariantEntity(prop) || isPropVariantReference(prop);
};
