import { dirname } from 'path';

import {
    ComponentsContext,
    GeneratedSourceFile,
    ProjectContext,
    ProjectDiagnostic,
    ProjectDiagnosticSource,
    SurfacesContext,
    ThemesContext,
    TokensContext,
    VariantsContext,
} from '@noodles-ui/support-types';

import { findRootPath } from '../monorepo/findRootPath';

import { PROJECT_MODULE_KEY, PROJECT_NODULE_NAME } from './constants';
import { createProgram } from './createProgram';
import { findLocalNodeModule } from './modules/findLocalNodeModule';
import { namedModule } from './modules/namedModule';

export const createProject = async (
    projectFile: string,
    expandPatterns: string[] = [],
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

    const theme: ThemesContext = new Map();
    const surface: SurfacesContext = new Map();
    const variant: VariantsContext = new Map();
    const component: ComponentsContext = new Map();
    const token: TokensContext = new Map();
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
        },
        debug: expandPatterns,
    };

    return project;
};
