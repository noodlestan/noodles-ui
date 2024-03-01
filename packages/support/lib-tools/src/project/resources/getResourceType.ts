import { Resource } from '@noodles-ui/core-types';

import {
    UnknownExtendResource,
    UnknownReferenceResource,
    UnknownResource,
} from '../../types/resources';

import { getExtendedResource } from './getExtendedResource';

export const getResourceType = (resource: UnknownResource): string => {
    const { type } = resource as Resource<string>;
    const { extend } = resource as UnknownExtendResource;
    if (extend) {
        return type ?? getResourceType(getExtendedResource(extend));
    }
    const { reference } = resource as UnknownReferenceResource;
    if (reference) {
        return type ?? getResourceType(reference);
    }
    return type ?? '??';
};
