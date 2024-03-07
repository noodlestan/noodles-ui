import { ExtendParams } from './primitives/params';
import { ExtendWithParams } from './primitives/utils';
import { Resource } from './resource';
import { TokenResource } from './tokens';

export type VariantOwnResource = Resource<'variant'> & {
    composable?: boolean;
    options?: string[];
    defaultOption?: string;
    vars?: {
        [key: string]: string[];
    };
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
    extend: ExtendWithParams<VariantResource, ExtendParams>;
};

export type VariantInlineResource = Omit<VariantOwnResource, 'module'>;
export type VariantInlineExtendResource = Omit<VariantExtendResource, 'module'>;
export type VariantInlineReferenceResource = { reference: VariantResource };

export type VariantResource = VariantOwnResource | VariantExtendResource;
