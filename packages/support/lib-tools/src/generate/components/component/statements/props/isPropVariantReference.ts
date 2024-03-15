import { PropEntity, PropVariantReference } from '@noodles-ui/core-types';

export const isPropVariantReference = (prop: PropEntity): PropVariantReference | undefined => {
    const { reference } = prop as PropVariantReference;
    if (reference) {
        return prop as PropVariantReference;
    }
};
