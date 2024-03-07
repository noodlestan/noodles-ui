import { MixinResource } from './mixins';
import { ExtendParams, Value } from './primitives/params';
import { ExtendWithParams } from './primitives/utils';
import { PropInlineResource, PropOverrides } from './props';
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
            value: Value;
        };
    };
    exposes?: string[];
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
    render?: RenderedComponentResource;
};

export type ComponentGeneratedResource = ComponentOwnResource & {
    generated: true;
    render: RenderedComponentResource;
};

export type ComponentExtendResource = Omit<ComponentOwnResource, 'type' | 'name'> & {
    name?: string;
    extend: ExtendWithParams<ComponentResource, ExtendParams>;
};

export type ComponentImportPartResource = Omit<ComponentOwnResource, 'type' | 'module'> & {
    // TODO alias
};

export type ComponentImportResource = ComponentOwnResource & {
    alias?: string;
    docs?: string;
    parts: ComponentImportPartResource[];
};

export type ComponentResource =
    | ComponentOwnResource
    | ComponentGeneratedResource
    | ComponentImportResource
    | ComponentExtendResource;
