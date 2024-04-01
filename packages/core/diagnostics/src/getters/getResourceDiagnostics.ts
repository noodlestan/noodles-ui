import { UnknownResource, getResourceTypedKey } from '@noodles-ui/core-resources';

import { ProjectDiagnostic } from '../types';

import { getItemDiagnostics } from './getItemDiagnostics';

export const getResourceDiagnostics = (
    entity: UnknownResource,
    diagnostics: ProjectDiagnostic[] = [],
): ProjectDiagnostic[] => {
    const key = getResourceTypedKey(entity);
    return getItemDiagnostics(key, diagnostics);
};
