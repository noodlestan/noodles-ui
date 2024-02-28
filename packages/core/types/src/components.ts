import { MixinResource } from './mixins';
import { Value } from './primitives/params';
import { PropResource } from './props';
import { Resource } from './resource';
import { VariantExtendResource } from './variants';

type LocalPropResource = Omit<PropResource, 'module'> | Omit<VariantExtendResource, 'module'>;

type ComponentPartResource = {
    name: string;
};

export type ComponentOwnResource = Resource<'component'> & {
    props?: {
        [name: string]: LocalPropResource;
    };
    uses?: MixinResource[];
};

export type ComponentExtendResource = Partial<Omit<ComponentOwnResource, 'props'>> & {
    module: string;
    extend: ComponentResource;
    defaults?: {
        [name: string]: {
            value: Value;
        };
    };
    hide?: {
        [name: string]: {
            value: Value;
        };
    };
    override?: {
        [name: string]: LocalPropResource;
    };
    expose?: {
        [name: string]: LocalPropResource;
    };
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
