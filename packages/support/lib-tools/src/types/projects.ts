import {
    ComponentResource,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantResource,
} from '@noodles-ui/core-types';

import { BuildContext } from './program';

export type ItemContext<T> = {
    meta: T;
    public: boolean;
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

export type ProjectContext = {
    projectFile: string;
    projectPath: string;
    rootPath?: string;
    build: BuildContext;
    surfaces: SurfacesContext;
    themes: ThemesContext;
    components: ComponentsContext;
    variants: VariantsContext;
    tokens: TokensContext;
};
