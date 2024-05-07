import { Value } from '@noodles-ui/core-types';

import { MixinResource } from '../mixin';
import { PropInlineResource, PropOverrides } from '../prop';
import { Resource } from '../types';
import {
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantInlineResource,
    VariantOverrides,
} from '../variant';

export type ComponentVars = {
    [key: string]: string | string[];
};

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

export type ComponentRenderResource = Resource<'component'> & {
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
    vars?: ComponentVars;
};

export type ComponentExtendResource = Omit<ComponentRenderResource, 'name' | 'render'> & {
    name?: string;
    extend: ComponentRenderResource | ComponentExtendResource;
};

export type ComponentImportPartResource = Omit<
    ComponentRenderResource,
    'type' | 'module' | 'render'
> & {
    // TODO alias
};

export type ComponentImportResource = Omit<ComponentRenderResource, 'render'> & {
    package?: string;
    parts: ComponentImportPartResource[];
    alias?: string;
    docs?: string;
};

export type ComponentResource =
    | ComponentRenderResource
    | ComponentImportResource
    | ComponentExtendResource;
