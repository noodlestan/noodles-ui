import { existsSync } from 'fs';
import { dirname, join } from 'path';

import { ProgramModule } from '@noodles-ui/support-types';
import { PackageJson } from 'type-fest';

import { readPackageJson } from '../readPackageJson';

const findPackageJson = (
    rootPath: string,
    path: string,
): { path: string; packageJson: PackageJson } | undefined => {
    const packageJsonFileName = join(path, 'package.json');

    if (existsSync(packageJsonFileName)) {
        return {
            path,
            packageJson: readPackageJson(packageJsonFileName),
        };
    } else {
        if (dirname(path) === rootPath) {
            return undefined;
        }
        return findPackageJson(rootPath, dirname(path));
    }
};

export const findLocalNodeModule = (
    rootPath: string,
    fileName: string,
): ProgramModule | undefined => {
    if (!fileName.startsWith(rootPath)) {
        throw new Error(`File "${fileName}" lies outside of root path ${rootPath}`);
    }

    const packageJsonAndPath = findPackageJson(rootPath, dirname(fileName));

    if (packageJsonAndPath) {
        const { packageJson, path } = packageJsonAndPath;
        if (!packageJson.name) {
            throw new Error(`Found a package.json without "name" at path "${path}".`);
        }
        return {
            name: packageJson.name,
            path,
        };
    }

    return undefined;
};
