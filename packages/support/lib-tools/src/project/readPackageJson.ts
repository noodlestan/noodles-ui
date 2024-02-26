import { readFileSync } from 'fs';

import { PackageJson } from 'type-fest';

export const readPackageJson = (fileName: string): PackageJson =>
    JSON.parse(readFileSync(fileName, 'utf8'));
