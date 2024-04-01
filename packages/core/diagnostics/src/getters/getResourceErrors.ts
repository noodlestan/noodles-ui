import { UnknownResource, getResourceTypedKey } from '@noodles-ui/core-resources';

import { ProjectDiagnostic } from '../types';

import { getItemErrors } from './getItemErrors';

export const getResourceErrors = (
    entity: UnknownResource,
    diagnostics: ProjectDiagnostic[] = [],
): ProjectDiagnostic[] => {
    const key = getResourceTypedKey(entity);
    return getItemErrors(key, diagnostics);
};
