import { MixinResource } from './mixins';
import { Value } from './primitives/params';
import { PropInlineResource, PropInstance, PropOverrides } from './props';
import { Resource } from './resource';
import {
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantInlineResource,
    VariantOverrides,
} from './variants';

export type LocalPropResource =
    | PropInlineResource
    | VariantInlineResource
    | VariantInlineExtendResource
    | VariantInlineReferenceResource;

export type LocalPropOverrides = PropOverrides | VariantOverrides;

export type RenderedComponentResource = {
    name: string;
    from: ComponentImportResource;
};

export type ComponentPropsResource = {
    [name: string]: LocalPropResource;
};

export type ComponentOwnResource = Resource<'component'> & {
    params?: string[];
    use?: MixinResource[];
    hides?: {
        [name: string]: {
            value?: Value;
        };
    };
    exposes?: '*' | string[];
    defaults?: {
        [name: string]: {
            // TODO incomplete abstraction - will have us against the ropes :-/
            value: Value;
        };
    };
    replaces?: ComponentPropsResource;
    props?: ComponentPropsResource;
    overrides?: {
        [name: string]: LocalPropOverrides;
    };
    render: RenderedComponentResource;
};

export type ComponentExtendResource = Omit<ComponentOwnResource, 'type' | 'name' | 'render'> & {
    name?: string;
    extend: ComponentOwnResource | ComponentExtendResource;
};

export type ComponentImportPartResource = Omit<
    ComponentOwnResource,
    'type' | 'module' | 'render'
> & {
    // TODO alias
};

export type ComponentImportResource = Omit<ComponentOwnResource, 'render'> & {
    alias?: string;
    docs?: string;
    parts: ComponentImportPartResource[];
};

export type ComponentResource =
    | ComponentOwnResource
    | ComponentImportResource
    | ComponentExtendResource;

export type ComponentInstanceProps = {
    [name: string]: PropInstance;
};

export type ComponentOwnInstance = Omit<ComponentOwnResource, 'use' | 'props'> & {
    use: MixinResource[];
    props: ComponentInstanceProps;
};

export type ComponentImportInstance = Omit<ComponentImportResource, 'use' | 'props'> & {
    props: ComponentInstanceProps;
};

export type ComponentInstance = ComponentOwnInstance | ComponentImportInstance;
