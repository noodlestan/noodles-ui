import { ProjectOwnResource } from '@noodles-ui/core-types';

import {
    ComponentEntityMap,
    MixinEntityMap,
    SurfaceEntityMap,
    ThemeEntityMap,
    TokenEntityMap,
    VariantEntityMap,
} from './entities';
import { BuildContext } from './program';
import { UnknownResource } from './resources';

export type ProjectDiagnosticSource = string | UnknownResource | ProjectDiagnosticFileError;

export type ProjectDiagnosticSeverity = 'error' | 'warning';

export type ProjectDiagnostic = {
    severity: ProjectDiagnosticSeverity;
    message: string;
    source: ProjectDiagnosticSource;
    data?: unknown;
};

export type ProjectDiagnosticFileError = {
    fileName: string;
    line: number;
    column: number;
    sourceCode?: string;
};

export type GeneratedSourceFile = {
    fileName: string;
    success?: boolean;
    skipped?: boolean;
    time?: number;
};

type ProjectAttributes = {
    projectFile: string;
    projectPath: string;
    rootPath?: string;
    resource?: Omit<ProjectOwnResource, 'type'>;
};

type ProjectAPI = {
    build: BuildContext;
    diagnostics: ProjectDiagnostic[];
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

export type ProjectEntitiesMap = {
    surface: SurfaceEntityMap;
    theme: ThemeEntityMap;
    component: ComponentEntityMap;
    variant: VariantEntityMap;
    token: TokenEntityMap;
    mixin: MixinEntityMap;
};

export type EntityType = 'surface' | 'theme' | 'component' | 'variant' | 'token' | 'mixin';

export type ProjectEntities = {
    entities: ProjectEntitiesMap;
};

export type ProjectContext = ProjectAttributes & ProjectAPI & ProjectEntities;
