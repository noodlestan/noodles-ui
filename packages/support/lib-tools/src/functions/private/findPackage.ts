/*!
 * hash-for-dep <https://github.com/stefanpenner/hash-for-dep>
 *
 * Copyright (c) 2016, Stefan Penner <stefan.penner@gmail.com>.
 *
 * Licensed under the ISC License.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED “AS IS” AND ISC DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL ISC BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

import { realpathSync, statSync } from 'fs';
import { basename, dirname, join } from 'path';

import { rootPath } from './rootPath.js';

type ENoEnt = {
    code: string;
};

function _getRealFilePath(filePath: string): string | null {
    let realPath = null; // null = 'FILE NOT FOUND'

    try {
        const stat = statSync(filePath);
        if (stat.isFile() || stat.isFIFO() || stat.isDirectory()) {
            realPath = realpathSync(filePath);
        }
    } catch (e) {
        if (e === null || typeof e !== 'object' || (e as ENoEnt).code !== 'ENOENT') {
            throw e;
        }
    }
    return realPath;
}

export const findPackagePath = (startPath: string, module: string): string | undefined => {
    const fsRoot = rootPath(startPath);

    let currPath = startPath;

    while (currPath !== fsRoot) {
        const endsWithNodeModules = basename(currPath).toLowerCase() === 'node_modules';
        const filePath = join(currPath, endsWithNodeModules ? '' : 'node_modules', module);
        const realPath = _getRealFilePath(filePath);

        if (realPath) {
            return realPath;
        }
        if (endsWithNodeModules) {
            currPath = dirname(currPath);
        }
        currPath = dirname(currPath);
    }

    return undefined;
};
