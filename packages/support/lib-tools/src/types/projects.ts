import {
    ComponentInstance,
    ComponentResource,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantInstance,
    VariantResource,
} from '@noodles-ui/core-types';

import { BuildContext } from './program';
import { UnknownResource } from './resources';

export type ItemContext<T, P = T> = {
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

export type SurfacesContext = {
    items: Map<string, SurfaceContext>;
};

export type ThemeContext = ItemContext<ThemeResource>;

export type ThemesContext = {
    items: Map<string, ThemeContext>;
};

export type ComponentContext = ItemContext<ComponentResource, ComponentInstance>;
export type ComponentContextWithInstance = ItemContextWithInstance<
    ComponentResource,
    ComponentInstance
>;

export type ComponentsContext = {
    items: Map<string, ComponentContext>;
};

export type VariantContext = ItemContext<VariantResource, VariantInstance>;
export type VariantContextWithInstance = ItemContextWithInstance<VariantResource, VariantInstance>;

export type VariantsContext = {
    items: Map<string, VariantContext>;
};

export type TokenContext = ItemContext<TokenResource>;

export type TokensContext = {
    items: Map<string, TokenContext>;
};

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

export type ProjectContext = {
    projectFile: string;
    projectPath: string;
    rootPath?: string;
    build: BuildContext;
    diagnostics: ProjectDiagnostic[];
    addDiagnostic: (source: ProjectDiagnosticSource, message: string, data?: unknown) => void;
    surfaces: SurfacesContext;
    themes: ThemesContext;
    components: ComponentsContext;
    variants: VariantsContext;
    tokens: TokensContext;
    debug: string[];
};
