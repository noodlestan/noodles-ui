import { ExtendWithParams } from './primitives/utils';
import { Resource } from './resource';

type PropExtendParams = {
    params: { [key: string]: string };
};

export type PropType = 'prop' | 'prop:list';

export type PropOwnResource = Resource<PropType> & {
    options?: string[];
    defaultOption?: string;
};

export type PropExtendResource = Partial<PropOwnResource> & {
    module: string;
    extend: PropResource | ExtendWithParams<PropResource, PropExtendParams>;
};

export type PropResource = PropOwnResource | PropExtendResource;
