import { Resource } from '@noodles-ui/core-types/src/resource';

type GenericResource = Partial<Resource<string>>;

export type UnknownExtendResource = Omit<GenericResource, 'type' | 'name'> & {
    extend: UnknownExtendResource | GenericResource;
};

export type UnknownReferenceResource = Omit<GenericResource, 'type' | 'name'> & {
    reference: UnknownReferenceResource | GenericResource;
};

export type UnknownResource = GenericResource | UnknownExtendResource | UnknownReferenceResource;
