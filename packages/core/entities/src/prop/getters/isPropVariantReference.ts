import { PropEntity, PropVariantReference } from '../..';

export const isPropVariantReference = (prop: PropEntity): PropVariantReference | undefined => {
    const { reference } = prop as PropVariantReference;
    if (reference) {
        return prop as PropVariantReference;
    }
};
