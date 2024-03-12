import { dirname } from 'path';

import ts from 'typescript';

import { formatFileNameRelativeToProject } from '../cli/format/formatFileNameRelativeToProject';
import { logInfo } from '../cli/logger/logInfo';
import { logMessage } from '../cli/logger/logMessage';
import { findRootPath } from '../monorepo/findRootPath';
import { BuildContext } from '../types/program';
import {
    ComponentsContext,
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
    logInfo('building project file...');
    logMessage('TS version:', ts.version);
    logMessage('TS entry point:', formatFileNameRelativeToProject(modules, projectFile, true));
    console.info('');

    const diagnostics: ProjectDiagnostic[] = [];

    const addDiagnostic = (source: ProjectDiagnosticSource, message: string, data?: unknown) =>
        diagnostics.push({
            message,
            source,
            data,
        });
    const themes: ThemesContext = { items: new Map() };
    const surfaces: SurfacesContext = { items: new Map() };
    const variants: VariantsContext = { items: new Map() };
    const components: ComponentsContext = { items: new Map() };
    const tokens: TokensContext = { items: new Map() };
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
        surfaces,
        themes,
        variants,
        components,
        tokens,
        debug: expandPatterns,
    };

    return project;
};
