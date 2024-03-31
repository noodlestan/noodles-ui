import {
    Resource,
    UnknownExtendResource,
    UnknownReferenceResource,
    UnknownResource,
} from '../types';

export const getResourceName = (resource: UnknownResource): string => {
    const { name } = resource as Resource<string>;
    const { extend } = resource as UnknownExtendResource;
    if (extend) {
        return name ?? getResourceName(extend);
    }
    const { reference } = resource as UnknownReferenceResource;
    if (reference) {
        return name ?? getResourceName(reference);
    }
    return name ?? '??';
};
