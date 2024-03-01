import { Params } from '@noodles-ui/core-types/src/primitives/params';
import { ExtendWithParams } from '@noodles-ui/core-types/src/primitives/utils';
import { Resource } from '@noodles-ui/core-types/src/resource';

type GenericResource = Partial<Resource<string>>;

export type UnknownExtendResource = Omit<GenericResource, 'type' | 'name'> & {
    extend: ExtendWithParams<UnknownExtendResource | GenericResource, Params>;
};

export type UnknownReferenceResource = Omit<GenericResource, 'type' | 'name'> & {
    reference: UnknownReferenceResource | GenericResource;
};

export type UnknownResource = GenericResource | UnknownExtendResource | UnknownReferenceResource;
