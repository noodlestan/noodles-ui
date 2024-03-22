import { statSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { RouteHandlerMethod } from 'fastify';

import { getFileContentType } from './getFileContentType';

export const useSpaServer = (root: string): RouteHandlerMethod => {
    return async (req, res) => {
        try {
            const fileName = join(root, req.url);
            const stats = statSync(fileName);
            if (!stats.isFile()) {
                throw new Error('no such');
            }
            const data = await readFile(fileName);
            const contentType = getFileContentType(fileName) || 'application/octet-stream';
            res.header('Content-Type', contentType);
            res.send(data);
        } catch (err: unknown) {
            const message = (err as Error).message || '';
            if (!message.includes('no such')) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const indexPath = join(root, 'index.html');
            const data = await readFile(indexPath);
            res.header('Content-Type', 'text/html');
            res.send(data);
        }
    };
};
