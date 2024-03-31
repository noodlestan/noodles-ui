import { dirname } from 'path';

import { PROJECT_MODULE_KEY, PROJECT_MODULE_NAME } from '@noodles-ui/core-types';
import {
    ComponentEntityMap,
    GeneratedSourceFile,
    MixinEntityMap,
    ProjectContext,
    ProjectDiagnostic,
    ProjectDiagnosticSeverity,
    ProjectDiagnosticSource,
    SurfaceEntityMap,
    ThemeEntityMap,
    TokenEntityMap,
    VariantEntityMap,
} from '@noodles-ui/support-types';

import { BuildOptions } from '../build/types';
import { findRootPath } from '../monorepo/findRootPath';

import { findLocalNodeModule } from './modules/findLocalNodeModule';
import { namedModule } from './modules/namedModule';
import { createProgram } from './program/createProgram';
import { getBuildErrorMessage } from './program/getters/getBuildErrorMessage';

export const createProject = async (
    projectFile: string,
    options: BuildOptions = {},
): Promise<ProjectContext> => {
    const module = findLocalNodeModule('/', projectFile);
    const projectPath = module ? module.path : dirname(projectFile);
    const rootPath = findRootPath(projectPath);

    const modules = new Map();
    modules.set(PROJECT_MODULE_KEY, namedModule(PROJECT_MODULE_NAME, projectPath));

    const diagnostics: ProjectDiagnostic[] = [];
    const diagnosticFn =
        (severity: ProjectDiagnosticSeverity) =>
        (source: ProjectDiagnosticSource, message: string, data?: unknown) =>
            diagnostics.push({
                severity,
                message,
                source,
                data,
            });

    const hasErrors = () => diagnostics.filter(d => d.severity === 'error').length > 0;

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
        build: { timestamp: new Date(), files: [], modules: new Map(), fileNames: [] },
        diagnostics,
        addError: diagnosticFn('error'),
        addWarning: diagnosticFn('warning'),
        hasErrors,
        compileProjectFile: async () => {
            project.build = await createProgram(projectFile, projectPath, rootPath);
            if (!project.build.success) {
                diagnosticFn('error')('build', getBuildErrorMessage(project.build));
            }
        },
        generatedSourceFiles,
        addGeneratedSourceFile,
        interactive: {
            hints,
            expand,
        },
        entities: {
            project: { name: '', module: '', use: [] },
            surface,
            theme,
            variant,
            component,
            token,
            mixin,
        },
    };

    return project;
};
