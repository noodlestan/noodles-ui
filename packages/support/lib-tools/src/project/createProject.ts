import { dirname } from 'path';

import {
    ComponentEntityMap,
    GeneratedSourceFile,
    MixinEntityMap,
    ProjectContext,
    ProjectDiagnostic,
    ProjectDiagnosticSource,
    SurfaceEntityMap,
    ThemeEntityMap,
    TokenEntityMap,
    VariantEntityMap,
} from '@noodles-ui/support-types';

import { BuildOptions } from '../build/types';
import { findRootPath } from '../monorepo/findRootPath';

import { PROJECT_MODULE_KEY, PROJECT_NODULE_NAME } from './constants';
import { findLocalNodeModule } from './modules/findLocalNodeModule';
import { namedModule } from './modules/namedModule';
import { createProgram } from './program/createProgram';

export const createProject = async (
    projectFile: string,
    options: BuildOptions = {},
): Promise<ProjectContext> => {
    const module = findLocalNodeModule('/', projectFile); // TODO cross-platform
    const projectPath = module ? module.path : dirname(projectFile);
    const rootPath = findRootPath(projectPath);

    const modules = new Map();
    modules.set(PROJECT_MODULE_KEY, namedModule(PROJECT_NODULE_NAME, projectPath));

    const diagnostics: ProjectDiagnostic[] = [];
    const addDiagnostic = (source: ProjectDiagnosticSource, message: string, data?: unknown) =>
        diagnostics.push({
            message,
            source,
            data,
        });

    const generatedSourceFiles: GeneratedSourceFile[] = [];
    const addGeneratedSourceFile = (source: GeneratedSourceFile) =>
        generatedSourceFiles.push(source);

    const theme: ThemeEntityMap = new Map();
    const surface: SurfaceEntityMap = new Map();
    const variant: VariantEntityMap = new Map();
    const component: ComponentEntityMap = new Map();
    const token: TokenEntityMap = new Map();
    const mixin: MixinEntityMap = new Map();

    const { hints = false, expand = [] } = options.interactive || {};

    const project: ProjectContext = {
        projectFile,
        projectPath,
        rootPath,
        build: { timestamp: new Date(), files: [], modules: new Map() },
        diagnostics,
        addDiagnostic,
        compileProjectFile: async () => {
            project.build = await createProgram(projectFile, projectPath, rootPath);
        },
        generatedSourceFiles,
        addGeneratedSourceFile,
        entities: {
            surface,
            theme,
            variant,
            component,
            token,
            mixin,
        },
        interactive: {
            hints,
            expand,
        },
    };

    return project;
};
