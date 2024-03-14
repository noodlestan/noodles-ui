import { Resource } from '@noodles-ui/core-types';
import {
    UnknownExtendResource,
    UnknownReferenceResource,
    UnknownResource,
} from '@noodles-ui/support-types';

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
