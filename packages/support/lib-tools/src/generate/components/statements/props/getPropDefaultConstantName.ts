import { ComponentInstance, PropInstance } from '@noodles-ui/core-types';

import { camelCase } from '../../../../util/string';

import { isPropVariantInstance } from './isPropVariantInstance';
import { isPropVariantReference } from './isPropVariantReference';

export const getPropDefaultConstantName = (
    instance: ComponentInstance,
    prop: PropInstance,
): string => {
    const variantProp = isPropVariantInstance(prop);
    if (variantProp) {
        return camelCase(variantProp.variant.name + '-' + 'DefaultOption');
    }
    const referenceProp = isPropVariantReference(prop);
    if (referenceProp) {
        return camelCase(referenceProp.reference.name + '-' + 'DefaultOption');
    }
    return camelCase(instance.name + '-' + prop.name + '-' + 'DefaultValue');
};
