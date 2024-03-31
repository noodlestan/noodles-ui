import { ComponentEntity, PropEntity } from '../..';

import { isPropVariantEntity } from './isPropVariantEntity';
import { isPropVariantReference } from './isPropVariantReference';

export const camelCase = (str: string): string =>
    str.replace(/-([a-z])/gi, match => match[1].toUpperCase());

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
