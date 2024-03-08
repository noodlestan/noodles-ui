import { Resource } from '@noodles-ui/core-types';

import {
    UnknownExtendResource,
    UnknownReferenceResource,
    UnknownResource,
} from '../../types/resources';

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
