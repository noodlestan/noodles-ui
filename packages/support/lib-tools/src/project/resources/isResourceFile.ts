import { RESOURCE_DEFITION_FILE_PATTERN, RESOURCE_FILE_PATTERN } from './constants';

export const isResourceFile = (file: string): boolean => {
    return file.endsWith(RESOURCE_FILE_PATTERN) || file.endsWith(RESOURCE_DEFITION_FILE_PATTERN);
};
