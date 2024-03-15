import { Value } from './primitives/params';
import { Resource } from './resource';
import { VariantEntity } from './variants';

export type PropType = 'prop';

export type PropOwnResource = Resource<PropType> & {
    defaultValue?: Value;
};

export type PropExtendResource = Partial<Omit<PropOwnResource, 'type'>> & {
    module: string;
    extend: PropResource;
};

export type PropOverrides = Partial<Omit<PropOwnResource, 'type'>>;

export type PropInlineResource = Omit<PropOwnResource, 'type' | 'name' | 'module'>;
export type PropInlineExtendResource = Omit<PropExtendResource, 'name' | 'module'>;

export type PropResource = PropOwnResource | PropExtendResource;

export type PropVariantEntity = PropOwnResource & { variant: VariantEntity };
export type PropVariantReference = PropOwnResource & { reference: VariantEntity };
export type PropEntity = PropOwnResource | PropVariantEntity | PropVariantReference;
