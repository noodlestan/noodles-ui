import {
    Resource,
    UnknownExtendResource,
    UnknownReferenceResource,
    UnknownResource,
} from '../types';

export const getResourceModule = (resource: UnknownResource): string => {
    const { module } = resource as Resource<string>;
    const { extend } = resource as UnknownExtendResource;
    if (extend) {
        return module ?? getResourceModule(extend);
    }
    const { reference } = resource as UnknownReferenceResource;
    if (reference) {
        return module ?? getResourceModule(reference);
    }
    return module ?? '??';
};
