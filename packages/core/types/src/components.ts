import { MixinResource } from './mixins';
import { Params, Value } from './primitives/params';
import { ExtendWithParams } from './primitives/utils';
import { PropInlineResource } from './props';
import { Resource } from './resource';
import {
    VariantInlineExtendResource,
    VariantInlineReferenceResource,
    VariantInlineResource,
} from './variants';

export type LocalPropResource =
    | PropInlineResource
    | VariantInlineResource
    | VariantInlineExtendResource
    | VariantInlineReferenceResource;

type ComponentPartResource = {
    name: string;
};

export type ComponentOwnResource = Resource<'component'> & {
    uses?: MixinResource[];
    defaults?: {
        [name: string]: {
            // TODO incomplete abstraction - will have us against the ropes :-/
            value: Value;
        };
    };
    hides?: {
        [name: string]: {
            value: Value;
        };
    };
    overrides?: {
        [name: string]: LocalPropResource;
    };
    props?: {
        [name: string]: LocalPropResource;
    };
};

export type ComponentExtendResource = Partial<Omit<ComponentOwnResource, 'type'>> & {
    module: string;
    extend: ExtendWithParams<ComponentResource, Params>;
};

export type ComponentImportResource = Resource<'component'> & {
    module: string;
    alias?: string;
    docs?: string;
    expose: ComponentPartResource[];
};

export type ComponentResource =
    | ComponentImportResource
    | ComponentOwnResource
    | ComponentExtendResource;
