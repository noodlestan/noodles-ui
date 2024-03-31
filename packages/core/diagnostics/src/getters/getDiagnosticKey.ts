import { UnknownResource, getResourceTypedKey } from '@noodles-ui/core-resources';

import { ProjectDiagnosticSource } from '../types';

import { fileErrorFromDiagnosticSource } from './fileErrorFromDiagnosticSource';

export const getDiagnosticKey = (source: ProjectDiagnosticSource): string => {
    if (typeof source === 'string') {
        return source;
    }
    const fileError = fileErrorFromDiagnosticSource(source);
    if (fileError) {
        return fileError.fileName;
    }
    return getResourceTypedKey(source as UnknownResource);
};
