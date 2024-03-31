import { PropEntity } from '../..';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const isPropVariant = (prop: PropEntity): PropEntity | undefined => {
    return isPropVariantEntity(prop) || isPropVariantReference(prop);
};
