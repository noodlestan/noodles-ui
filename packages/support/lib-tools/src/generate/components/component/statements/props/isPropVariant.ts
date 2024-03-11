import { PropInstance, PropVariantInstance, PropVariantReference } from '@noodles-ui/core-types';

import { isPropVariantInstance } from './isPropVariantInstance';
import { isPropVariantReference } from './isPropVariantReference';

export const isPropVariant = (
    prop: PropInstance,
): PropVariantInstance | PropVariantReference | undefined => {
    return isPropVariantInstance(prop) || isPropVariantReference(prop);
};
