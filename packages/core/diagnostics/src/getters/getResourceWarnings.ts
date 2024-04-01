import { UnknownResource, getResourceTypedKey } from '@noodles-ui/core-resources';

import { ProjectDiagnostic } from '../types';

import { getItemWarnings } from './getItemWarnings';

export const getResourceWarnings = (
    entity: UnknownResource,
    diagnostics: ProjectDiagnostic[] = [],
): ProjectDiagnostic[] => {
    const key = getResourceTypedKey(entity);
    return getItemWarnings(key, diagnostics);
};
