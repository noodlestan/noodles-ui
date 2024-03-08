import { MixinInlineResource } from './mixins';
import { Value } from './primitives/params';
import { Resource } from './resource';
import { TokenResource } from './tokens';

export type VariantVars = {
    [key: string]: string | string[];
};

export type VariantOwnResource = Resource<'variant'> & {
    composable?: boolean;
    mixin?: MixinInlineResource;
    options?: string[];
    defaultValue?: Value;
    vars?: VariantVars;
    params?: string[];
    variable?: string;
    surface?: boolean;
    tokens?: Array<Omit<TokenResource, 'type' | 'module'>>;
};

export type VariantOverrides = Partial<Omit<VariantOwnResource, 'type'>> & {
    name: string;
};

export type VariantExtendResource = VariantOverrides & {
    module: string;
    name: string;
    extend: VariantResource;
};

export type VariantInlineResource = Omit<VariantOwnResource, 'module'>;
export type VariantInlineExtendResource = Omit<VariantExtendResource, 'module'>;
export type VariantInlineReferenceResource = { reference: VariantResource; defaultValue?: Value };

export type VariantResource = VariantOwnResource | VariantExtendResource;
export type VariantInstance = Omit<VariantOwnResource, 'params' | 'composable' | 'vars'> & {
    vars: VariantVars;
};

export type VariantReference = { reference: VariantInstance };
