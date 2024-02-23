import { MixinResource } from './mixins';
import { Value } from './primitives/params';
import { PropResource } from './props';
import { VariantOwnResource } from './variants';

type ComponentExtendResource = Partial<ComponentOwnResource> & {
    extend: ComponentResource;
    api?: {
        defaultValue?: {
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
            [name: string]: Partial<VariantOwnResource>;
        };
    };
};

type ComponentOwnResource = {
    type: 'component';
    name: string;
    props?: {
        [name: string]: PropResource;
    };
    uses?: MixinResource[];
};

type ComponentPartResource = {
    name: string;
};

export type ComponentImportResource = {
    type: 'component';
    module: string;
    name: string;
    alias?: string;
    docs?: string;
    expose: ComponentPartResource[];
};

export type ComponentResource =
    | ComponentImportResource
    | ComponentOwnResource
    | ComponentExtendResource;
