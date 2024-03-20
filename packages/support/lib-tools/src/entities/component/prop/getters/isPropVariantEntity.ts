import { PropEntity, PropVariantEntity } from '@noodles-ui/core-types';

export const isPropVariantEntity = (prop: PropEntity): PropVariantEntity | undefined => {
    const { variant } = prop as PropVariantEntity;
    if (variant) {
        return prop as PropVariantEntity;
    }
};
