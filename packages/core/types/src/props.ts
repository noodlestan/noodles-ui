import { ExtendParams, Value } from './primitives/params';
import { ExtendWithParams } from './primitives/utils';
import { Resource } from './resource';

export type PropType = 'prop';

export type PropOwnResource = Resource<PropType> & {
    defaultValue?: Value;
};

export type PropExtendResource = Partial<Omit<PropOwnResource, 'type'>> & {
    module: string;
    extend: ExtendWithParams<PropResource, ExtendParams>;
};

export type PropOverrides = Partial<Omit<PropOwnResource, 'type'>>;

export type PropInlineResource = Omit<PropOwnResource, 'type' | 'name' | 'module'>;

export type PropInlineExtendResource = Omit<PropExtendResource, 'name' | 'module'>;

export type PropResource = PropOwnResource | PropExtendResource;
