import { dirname } from 'path';

import { GeneratedSourceFile } from '@noodles-ui/core-compiler-types';
import {
    ProjectDiagnostic,
    ProjectDiagnosticSeverity,
    ProjectDiagnosticSource,
} from '@noodles-ui/core-diagnostics';
import {
    ComponentEntityMap,
    MixinEntityMap,
    SurfaceEntityMap,
    SystemEntityMap,
    ThemeEntityMap,
    TokenEntityMap,
    VariantEntityMap,
} from '@noodles-ui/core-entities';

import { PROJECT_MODULE_KEY, PROJECT_MODULE_NAME } from './constants';
import { findLocalNodeModule } from './modules/findLocalNodeModule';
import { namedModule } from './modules/namedModule';
import { findRootPath } from './monorepo/findRootPath';
import { createProgram } from './program/createProgram';
import { getBuildErrorMessage } from './program/getters/getBuildErrorMessage';
import { CompilerContext, CompilerOptions } from './types';

export const createCompiler = async (
    projectFile: string,
    options: CompilerOptions = {},
): Promise<CompilerContext> => {
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

    const system: SystemEntityMap = new Map();
    const theme: ThemeEntityMap = new Map();
    const surface: SurfaceEntityMap = new Map();
    const variant: VariantEntityMap = new Map();
    const component: ComponentEntityMap = new Map();
    const token: TokenEntityMap = new Map();
    const mixin: MixinEntityMap = new Map();

    const { hints = false, expand = [] } = options.interactive || {};

    const compiler: CompilerContext = {
        projectFile,
        projectPath,
        project: { type: 'project', name: '', module: '', resources: {} },
        rootPath,
        build: { timestamp: new Date(), files: [], modules: new Map(), fileNames: [] },
        diagnostics,
        addError: diagnosticFn('error'),
        addWarning: diagnosticFn('warning'),
        hasErrors,
        compileProjectFile: async () => {
            compiler.build = await createProgram(projectFile, projectPath, rootPath);
            if (!compiler.build.success) {
                diagnosticFn('error')('build', getBuildErrorMessage(compiler.build));
            }
        },
        generatedSourceFiles,
        addGeneratedSourceFile,
        interactive: {
            hints,
            expand,
        },
        entities: {
            system,
            surface,
            theme,
            variant,
            component,
            token,
            mixin,
        },
    };

    return compiler;
};
