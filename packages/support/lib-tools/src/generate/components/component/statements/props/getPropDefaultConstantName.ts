import { ComponentEntity, PropEntity } from '@noodles-ui/core-types';

import { camelCase } from '../../../../../util/string';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropDefaultConstantName = (entity: ComponentEntity, prop: PropEntity): string => {
    const variantProp = isPropVariantEntity(prop);
    if (variantProp) {
        return camelCase(variantProp.variant.name + '-' + 'DefaultOption');
    }
    const referenceProp = isPropVariantReference(prop);
    if (referenceProp) {
        return camelCase(referenceProp.reference.name + '-' + 'DefaultOption');
    }
    return camelCase(entity.name + '-' + prop.name + '-' + 'DefaultValue');
};
