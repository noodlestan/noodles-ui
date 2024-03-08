import { Value } from './primitives/params';
import { Resource } from './resource';
import { VariantInstance } from './variants';

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

export type PropVariantInstance = PropOwnResource & { variant: VariantInstance };
export type PropVariantReference = PropOwnResource & { reference: VariantInstance };
export type PropInstance = PropOwnResource | PropVariantInstance | PropVariantReference;
