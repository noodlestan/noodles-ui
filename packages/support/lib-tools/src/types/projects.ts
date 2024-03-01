import {
    ComponentResource,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantResource,
} from '@noodles-ui/core-types';

import { BuildContext } from './program';
import { UnknownResource } from './resources';

export type ItemContext<T> = {
    resource: T;
    public: boolean;
    consumes: Set<string>;
    consumers: Set<string>;
    instance?: T;
};

export type SurfaceContext = ItemContext<SurfaceResource>;

export type SurfacesContext = {
    items: Map<string, SurfaceContext>;
};

export type ThemeContext = ItemContext<ThemeResource>;

export type ThemesContext = {
    items: Map<string, ThemeContext>;
};

export type ComponentContext = ItemContext<ComponentResource>;

export type ComponentsContext = {
    items: Map<string, ComponentContext>;
};

export type VariantContext = ItemContext<VariantResource>;

export type VariantsContext = {
    items: Map<string, VariantContext>;
};

export type TokenContext = ItemContext<TokenResource>;

export type TokensContext = {
    items: Map<string, TokenContext>;
};

export type ProjectDiagnosticSource = string | UnknownResource;

export type ProjectDiagnostic = {
    message: string;
    source: ProjectDiagnosticSource;
};

export type ProjectContext = {
    projectFile: string;
    projectPath: string;
    rootPath?: string;
    build: BuildContext;
    diagnostics: ProjectDiagnostic[];
    addDiagnostic: (source: ProjectDiagnosticSource, message: string) => void;
    surfaces: SurfacesContext;
    themes: ThemesContext;
    components: ComponentsContext;
    variants: VariantsContext;
    tokens: TokensContext;
    debug: string[];
};
