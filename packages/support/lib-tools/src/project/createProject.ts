import { dirname } from 'path';

import { findRootPath } from '../monorepo/findRootPath';
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
} from '../types/projects';

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

    const themes: ThemesContext = new Map();
    const surfaces: SurfacesContext = new Map();
    const variants: VariantsContext = new Map();
    const components: ComponentsContext = new Map();
    const tokens: TokensContext = new Map();
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
        surfaces,
        themes,
        variants,
        components,
        tokens,
        debug: expandPatterns,
    };

    return project;
};
