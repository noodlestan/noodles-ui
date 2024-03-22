import { extname } from 'path';

import { mimeTypes } from './mimeTypes';

export const getFileContentType = (fileName: string): string | undefined => {
    const extension = extname(fileName).toLowerCase();
    return mimeTypes[extension];
};
