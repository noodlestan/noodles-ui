import { Params } from './primitives/params';
import { ExtendWithParams } from './primitives/utils';
import { Resource } from './resource';

export type PropType = 'prop' | 'prop:list';

export type PropOwnResource = Resource<PropType> & {
    options?: string[];
    defaultOption?: string;
};

export type PropExtendResource = Partial<Omit<PropOwnResource, 'type'>> & {
    module: string;
    extend: ExtendWithParams<PropResource, Params>;
};

export type PropInlineResource = Omit<PropOwnResource, 'module' | 'name'>;
export type PropInlineExtendResource = Omit<PropExtendResource, 'module' | 'name'>;

export type PropResource = PropOwnResource | PropExtendResource;
