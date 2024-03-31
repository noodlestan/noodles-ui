import { MixinInlineResource } from './mixins';
import { Value } from './primitives/params';
import { Resource } from './resource';
import { InlineTokenResource } from './tokens';

export type VariantVars = {
    [key: string]: string | string[];
};

export type VariantOwnResource = Resource<'variant'> & {
    mixin?: MixinInlineResource;
    options?: string[];
    defaultValue?: string;
    params?: string[];
    vars?: VariantVars;
    surface?: boolean;
    tokens?: Array<InlineTokenResource>;
};

export type VariantOverrides = Partial<Omit<VariantOwnResource, 'type' | 'mixin'>> & {
    name: string;
};

export type VariantExtendResource = VariantOverrides & {
    module: string;
    extend: VariantResource;
};

export type VariantInlineResource = Omit<VariantOwnResource, 'module'>;
export type VariantInlineExtendResource = Omit<VariantExtendResource, 'module'>;
export type VariantInlineReferenceResource = {
    reference: VariantOwnResource;
    defaultValue?: Value;
};

export type VariantResource = VariantOwnResource | VariantExtendResource;
export type VariantEntity = Omit<VariantOwnResource, 'options' | 'vars'> & {
    options: string[];
    vars: VariantVars;
};

export type VariantReference = { reference: VariantEntity };
