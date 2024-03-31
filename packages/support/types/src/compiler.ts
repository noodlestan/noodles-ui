import { ProjectDiagnostic, ProjectDiagnosticSource } from './diagnostics';
import {
    ComponentEntityMap,
    MixinEntityMap,
    ProjectEntityMap,
    SurfaceEntityMap,
    ThemeEntityMap,
    TokenEntityMap,
    VariantEntityMap,
} from './entities';
import { BuildContext } from './program';

export type GeneratedSourceFile = {
    fileName: string;
    success?: boolean;
    skipped?: boolean;
    time?: number;
};

type CompilerAttributes = {
    projectFile: string;
    projectPath: string;
    rootPath?: string;
};

type CompilerAPI = {
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

export type EntityType = keyof ProjectEntitiesMap;

export type ProjectEntitiesMap = {
    project: ProjectEntityMap;
    surface: SurfaceEntityMap;
    theme: ThemeEntityMap;
    component: ComponentEntityMap;
    variant: VariantEntityMap;
    token: TokenEntityMap;
    mixin: MixinEntityMap;
};

export type ProjectEntities = {
    entities: ProjectEntitiesMap;
};

export type CompilerContext = CompilerAttributes & CompilerAPI & ProjectEntities;
