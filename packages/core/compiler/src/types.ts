import { GeneratedSourceFile } from '@noodles-ui/core-compiler-types';
import { ProjectDiagnosticSource, ProjectDiagnostics } from '@noodles-ui/core-diagnostics';
import { ProjectEntities, ProjectEntity } from '@noodles-ui/core-entities';
import { ThemeResource } from '@noodles-ui/core-resources';
import { ThemeTokens } from '@noodles-ui/core-types';

import { BuildContext } from './program/types';

type CompilerAttributes = {
    project: ProjectEntity;
    projectFile: string;
    projectPath: string;
    rootPath?: string;
};

type CompilerAPI = {
    build: BuildContext;
    addError: (source: ProjectDiagnosticSource, message: string, data?: unknown) => void;
    addWarning: (source: ProjectDiagnosticSource, message: string, data?: unknown) => void;
    compileProjectFile: () => Promise<void>;
    hasErrors: () => boolean;
    generatedSourceFiles: GeneratedSourceFile[];
    addGeneratedSourceFile: (source: GeneratedSourceFile) => void;
    interactive: {
        hints: boolean;
        expand: string[];
    };
};

export type CompilerContext = CompilerAttributes &
    CompilerAPI &
    ProjectEntities &
    ProjectDiagnostics;

export type ThemeTokensSchema = {
    tokens: ThemeTokens;
};

export type ThemeTokensLoader = (
    project: CompilerContext,
    theme: ThemeResource,
) => Promise<ThemeTokensSchema | undefined>;

export type CompilerOptions = {
    themeTokensLoader?: ThemeTokensLoader;
    interactive?: {
        expand?: string[];
        hints?: boolean;
    };
};
