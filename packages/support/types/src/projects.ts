import {
    ComponentEntity,
    ComponentResource,
    ProjectOwnResource,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantEntity,
    VariantResource,
} from '@noodles-ui/core-types';

import { BuildContext } from './program';
import { UnknownResource } from './resources';

export type ResourceContext<T> = {
    key: string;
    resource: T;
    public: boolean;
    consumes: Set<string>;
    consumers: Set<string>;
};

export type EntityBuildContext<T, V> = {
    context: T;
    entity: V;
};

export type UnknownBuildContext = EntityBuildContext<
    ResourceContext<UnknownResource>,
    UnknownResource
>;

export type EntityBuildMap<
    T extends EntityBuildContext<ResourceContext<UnknownResource>, UnknownResource>,
> = Map<string, T>;

export type SurfaceContext = ResourceContext<SurfaceResource>;
export type SurfaceBuildContext = EntityBuildContext<SurfaceContext, SurfaceResource>;
export type SurfaceEntityMap = EntityBuildMap<SurfaceBuildContext>;

export type ThemeContext = ResourceContext<ThemeResource>;
export type ThemeBuildContext = EntityBuildContext<ThemeContext, ThemeResource>;
export type ThemeEntityMap = EntityBuildMap<ThemeBuildContext>;

export type VariantContext = ResourceContext<VariantResource>;
export type VariantBuildContext = EntityBuildContext<VariantContext, VariantEntity>;
export type VariantEntityMap = EntityBuildMap<VariantBuildContext>;

export type ComponentContext = ResourceContext<ComponentResource>;
export type ComponentBuildContext = EntityBuildContext<ComponentContext, ComponentEntity>;
export type ComponentEntityMap = EntityBuildMap<ComponentBuildContext>;

export type TokenContext = ResourceContext<TokenResource>;
export type TokenBuildContext = EntityBuildContext<TokenContext, TokenResource>;
export type TokenEntityMap = EntityBuildMap<TokenBuildContext>;

export type ProjectDiagnosticSource = string | UnknownResource | ProjectDiagnosticFileError;

export type ProjectDiagnostic = {
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
    addDiagnostic: (source: ProjectDiagnosticSource, message: string, data?: unknown) => void;
    compileProjectFile: () => Promise<void>;
    generatedSourceFiles: GeneratedSourceFile[];
    addGeneratedSourceFile: (source: GeneratedSourceFile) => void;
    debug: string[];
};

export type ProjectEntitiesMap = {
    surface: SurfaceEntityMap;
    theme: ThemeEntityMap;
    component: ComponentEntityMap;
    variant: VariantEntityMap;
    token: TokenEntityMap;
};

export type EntityType = keyof ProjectEntitiesMap;

export type ProjectEntities = {
    entities: ProjectEntitiesMap;
};

export type ProjectContext = ProjectAttributes & ProjectAPI & ProjectEntities;
