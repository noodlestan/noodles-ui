import { Value } from '@noodles-ui/core-types';

import { Resource } from '../types';

export type PropType = 'prop';

export type PropOwnResource = Resource<PropType> & {
    // TODO ValueType = 'string' | 'number' | 'boolean' | string (e.g.: 'FooBar')
    // TODO valueType?: ValueType
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
