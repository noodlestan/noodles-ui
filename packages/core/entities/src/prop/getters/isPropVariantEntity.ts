import { PropEntity, PropVariantEntity } from '../..';

export const isPropVariantEntity = (prop: PropEntity): PropVariantEntity | undefined => {
    const { variant } = prop as PropVariantEntity;
    if (variant) {
        return prop as PropVariantEntity;
    }
};
