import {
    PROJECT_MODULE_KEY,
    PROJECT_MODULE_NAME,
    ROOT_MODULE_KEY,
    ROOT_MODULE_NAME,
    UNKNOWN_MODULE_KEY,
    UNKNOWN_MODULE_NAME,
} from '@noodles-ui/core-types';
import { ProgramModule, ProgramModuleContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { findLocalNodeModule } from '../../modules/findLocalNodeModule';
import { getLastNodeModule } from '../../modules/getLastNodeModule';
import { namedModule } from '../../modules/namedModule';
import { isResourceFile } from '../getters/isResourceFile';

const makeNamedModule = (
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

function makeLocalModule(
    map: Map<string, ProgramModuleContext>,
    rootPath: string,
    fileName: string,
): ProgramModuleContext {
    const nodeModule = findLocalNodeModule(rootPath, fileName);
    if (nodeModule) {
        return makeNamedModule(map, nodeModule);
    } else {
        return map.get(ROOT_MODULE_KEY) as ProgramModuleContext;
    }
}

function makeUnknownModule(map: Map<string, ProgramModuleContext>): ProgramModuleContext {
    const module = map.get(UNKNOWN_MODULE_KEY);
    if (module) {
        return module;
    }
    const newModule = namedModule(UNKNOWN_MODULE_NAME, '');
    map.set(UNKNOWN_MODULE_KEY, newModule);
    return newModule;
}

const makeFileModule = (
    map: Map<string, ProgramModuleContext>,
    rootPath: string | undefined,
    projectPath: string,
    fileName: string,
): ProgramModuleContext => {
    const nodeModule = getLastNodeModule(fileName);
    if (nodeModule) {
        return makeNamedModule(map, nodeModule);
    } else if (rootPath && fileName.startsWith(rootPath)) {
        return makeLocalModule(map, rootPath, fileName);
    }
    if (fileName.startsWith(projectPath)) {
        return map.get(PROJECT_MODULE_KEY) as ProgramModuleContext;
    }
    return makeUnknownModule(map);
};

export const makeProgramModules = (
    program: ts.Program,
    projectPath: string,
    rootPath?: string,
): Map<string, ProgramModuleContext> => {
    const files = program.getSourceFiles();

    //     .filter(file => compiled.isSourceFileDefaultLibrary(file))
    //     .filter(file => !compiled.isSourceFileFromExternalLibrary(file))
    //     .filter(file => compiled.isSourceFileFromExternalLibrary(file))

    const map: Map<string, ProgramModuleContext> = new Map();

    map.set(PROJECT_MODULE_KEY, namedModule(PROJECT_MODULE_NAME, projectPath));
    if (rootPath) {
        map.set(ROOT_MODULE_KEY, namedModule(ROOT_MODULE_NAME, rootPath));
    }

    files
        .filter(file => isResourceFile(file.fileName))
        .forEach(file => {
            const module = makeFileModule(map, rootPath, projectPath, file.fileName);
            module.filenames.push(file.fileName.replace(module.path, ''));
        });

    return map;
};
