import {
    ComponentInstance,
    ComponentResource,
    ProjectOwnResource,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantInstance,
    VariantResource,
} from '@noodles-ui/core-types';

import { BuildContext } from './program';
import { UnknownResource } from './resources';

export type ItemContext<T, P = T> = {
    key: string;
    resource: T;
    public: boolean;
    consumes: Set<string>;
    consumers: Set<string>;
    instance?: P;
};

export type ItemContextWithInstance<T, P = T> = Omit<ItemContext<T, P>, 'instance'> & {
    instance: P;
};

export type SurfaceContext = ItemContext<SurfaceResource>;
export type SurfaceContextWithInstance = ItemContextWithInstance<SurfaceResource>;
export type SurfacesContext = Map<string, SurfaceContext>;

export type ThemeContext = ItemContext<ThemeResource>;
export type ThemeContextWithInstance = ItemContextWithInstance<ThemeResource>;

export type ThemesContext = Map<string, ThemeContext>;

export type ComponentContext = ItemContext<ComponentResource, ComponentInstance>;
export type ComponentContextWithInstance = ItemContextWithInstance<
    ComponentResource,
    ComponentInstance
>;
export type ComponentsContext = Map<string, ComponentContext>;

export type VariantContext = ItemContext<VariantResource, VariantInstance>;
export type VariantContextWithInstance = ItemContextWithInstance<VariantResource, VariantInstance>;
export type VariantsContext = Map<string, VariantContext>;

export type TokenContext = ItemContext<TokenResource>;
export type TokenContextWithInstance = ItemContextWithInstance<TokenResource>;
export type TokensContext = Map<string, TokenContext>;

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
    surface: SurfacesContext;
    theme: ThemesContext;
    component: ComponentsContext;
    variant: VariantsContext;
    token: TokensContext;
};

export type EntityType = keyof ProjectEntitiesMap;

export type ProjectEntities = {
    entities: ProjectEntitiesMap;
};

export type ProjectContext = ProjectAttributes & ProjectAPI & ProjectEntities;