import { PropInstance, PropVariantInstance } from '@noodles-ui/core-types';

export const isPropVariantInstance = (prop: PropInstance): PropVariantInstance | undefined => {
    const { variant } = prop as PropVariantInstance;
    if (variant) {
        return prop as PropVariantInstance;
    }
};
