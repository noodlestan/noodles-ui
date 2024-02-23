import { ExtendWithParams } from './primitives/utils';
import { VariantExtendResource } from './variants';

export type PropType = 'prop' | 'prop:list';

export type PropOwnResource = {
    type: PropType;
    name?: string;
    options?: string[];
    defaultOption?: string;
};
type PropExtendParams = {
    params: { [key: string]: string };
};

export type PropExtendResource = Partial<PropOwnResource> & {
    extend: PropResource | ExtendWithParams<PropResource, PropExtendParams>;
};

export type PropResource = PropOwnResource | PropExtendResource | VariantExtendResource;
