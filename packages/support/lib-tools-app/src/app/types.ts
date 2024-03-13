import {
    ComponentInstance,
    ComponentResource,
    SurfaceResource,
    ThemeResource,
    TokenResource,
    VariantInstance,
    VariantResource,
} from '@noodles-ui/core-types';

export type BuildEvent = {
    success: boolean;
    timestamp: string;
};

export type ItemContext<T, P = T> = {
    resource: T;
    public: boolean;
    consumes: Set<string>;
    consumers: Set<string>;
    instance: P;
};

type SurfaceContext = ItemContext<SurfaceResource>;
type ThemeContext = ItemContext<ThemeResource>;
type ComponentContext = ItemContext<ComponentResource, ComponentInstance>;
type VariantContext = ItemContext<VariantResource, VariantInstance>;
type TokenContext = ItemContext<TokenResource>;

export type BuildSnapshot = {
    surfaces: { [key: string]: SurfaceContext };
    themes: { [key: string]: ThemeContext };
    components: { [key: string]: ComponentContext };
    variants: { [key: string]: VariantContext };
    tokens: { [key: string]: TokenContext };
};

export type BuildData = { build: BuildEvent; snapshot: BuildSnapshot };
