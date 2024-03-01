import { Params } from './primitives/params';
import { ExtendWithParams } from './primitives/utils';
import { Resource } from './resource';
import { TokenResource } from './tokens';

export type VariantOwnResource = Resource<'variant'> & {
    composable?: true;
    options?: string[];
    defaultOption?: string;
    vars?: {
        [key: string]: string[];
    };
    params?: string[];
    surface?: boolean;
    tokens?: Array<Omit<TokenResource, 'type' | 'module'>>;
};

export type VariantExtendResource = Partial<Omit<VariantOwnResource, 'type'>> & {
    module: string;
    extend: ExtendWithParams<VariantResource, Params>;
};

export type VariantInlineResource = Omit<VariantOwnResource, 'module' | 'name'>;
export type VariantInlineExtendResource = Omit<VariantExtendResource, 'module' | 'name'>;
export type VariantInlineReferenceResource = { reference: VariantResource };

export type VariantResource = VariantOwnResource | VariantExtendResource;
