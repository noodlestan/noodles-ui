import { ProgramModule, ProgramModuleContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import {
    PROJECT_MODULE_KEY,
    PROJECT_NODULE_NAME,
    ROOT_MODULE_KEY,
    ROOT_NODULE_NAME,
    UNKNOWN_MODULE_KEY,
    UNKNOWN_MODULE_NAME,
} from './constants';
import { findLocalNodeModule } from './modules/findLocalNodeModule';
import { getLastNodeModule } from './modules/getLastNodeModule';
import { namedModule } from './modules/namedModule';
import { isResourceFile } from './resources/isResourceFile';

const storeNamedModule = (
    map: Map<string, ProgramModuleContext>,
    nodeModule: ProgramModule,
): ProgramModuleContext => {
    const { name, path } = nodeModule;
    const module = map.get(name);
    if (module) {
        return module;
    }
    const newModule = namedModule(name, path);
    map.set(name, newModule);
    return newModule;
};

function storeLocalModule(
    map: Map<string, ProgramModuleContext>,
    rootPath: string,
    fileName: string,
): ProgramModuleContext {
    const nodeModule = findLocalNodeModule(rootPath, fileName);
    if (nodeModule) {
        return storeNamedModule(map, nodeModule);
    } else {
        return map.get(ROOT_MODULE_KEY) as ProgramModuleContext;
    }
}

function storeUnknownModule(map: Map<string, ProgramModuleContext>): ProgramModuleContext {
    const module = map.get(UNKNOWN_MODULE_KEY);
    if (module) {
        return module;
    }
    const newModule = namedModule(UNKNOWN_MODULE_NAME, '');
    map.set(UNKNOWN_MODULE_KEY, newModule);
    return newModule;
}

const storeFileModule = (
    map: Map<string, ProgramModuleContext>,
    rootPath: string | undefined,
    projectPath: string,
    fileName: string,
): ProgramModuleContext => {
    const nodeModule = getLastNodeModule(fileName);
    if (nodeModule) {
        return storeNamedModule(map, nodeModule);
    } else if (rootPath && fileName.startsWith(rootPath)) {
        return storeLocalModule(map, rootPath, fileName);
    }
    if (fileName.startsWith(projectPath)) {
        return map.get(PROJECT_MODULE_KEY) as ProgramModuleContext;
    }
    return storeUnknownModule(map);
};

export const getProgramModules = (
    program: ts.Program,
    projectPath: string,
    rootPath?: string,
): Map<string, ProgramModuleContext> => {
    const files = program.getSourceFiles();

    //     .filter(file => compiled.isSourceFileDefaultLibrary(file))
    //     .filter(file => !compiled.isSourceFileFromExternalLibrary(file))
    //     .filter(file => compiled.isSourceFileFromExternalLibrary(file))

    const map: Map<string, ProgramModuleContext> = new Map();

    map.set(PROJECT_MODULE_KEY, namedModule(PROJECT_NODULE_NAME, projectPath));
    if (rootPath) {
        map.set(ROOT_MODULE_KEY, namedModule(ROOT_NODULE_NAME, rootPath));
    }

    files
        .filter(file => isResourceFile(file.fileName))
        .forEach(file => {
            const module = storeFileModule(map, rootPath, projectPath, file.fileName);
            module.filenames.push(file.fileName.replace(module.path, ''));
        });

    return map;
};
