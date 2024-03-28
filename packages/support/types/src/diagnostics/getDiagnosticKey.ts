import { UnknownResource } from '../resources';
import { getResourceTypedKey } from '../resources/getResourceTypedKey';

import { fileErrorFromDiagnosticSource } from './fileErrorFromDiagnosticSource';
import { ProjectDiagnosticSource } from './types';

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
