export type Resource<T extends string> = {
    type: T;
    name: string;
    module: string;
};

type GenericResource = Partial<Resource<string>>;

export type UnknownExtendResource = Omit<GenericResource, 'type' | 'name'> & {
    extend: UnknownExtendResource | GenericResource;
};

export type UnknownReferenceResource = Omit<GenericResource, 'type' | 'name'> & {
    reference: UnknownReferenceResource | GenericResource;
};

export type UnknownResource = GenericResource | UnknownExtendResource | UnknownReferenceResource;
