import {
    Resource,
    UnknownExtendResource,
    UnknownReferenceResource,
    UnknownResource,
} from '../types';

export const getResourceType = (resource: UnknownResource): string => {
    const { type } = resource as Resource<string>;
    const { extend } = resource as UnknownExtendResource;
    if (extend) {
        return type ?? getResourceType(extend);
    }
    const { reference } = resource as UnknownReferenceResource;
    if (reference) {
        return type ?? getResourceType(reference);
    }
    return type ?? '??';
};
