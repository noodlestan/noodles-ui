import { ExtendWithParams } from './primitives/utils';
import { Resource } from './resource';
import { TokenResource } from './tokens';

type VariantExtendParams = {
    params: { [key: string]: string };
};

export type VariantOwnResource = Resource<'variant'> & {
    attribute?: string;
    options?: string[];
    defaultOption?: string;
    vars?: {
        [key: string]: string[];
    };
    params?: string[];
    surface?: boolean;
    tokens: Array<Omit<TokenResource, 'type' | 'module'>>;
};

export type VariantExtendResource = Partial<VariantOwnResource> & {
    module: string;
    extend: VariantResource | ExtendWithParams<VariantResource, VariantExtendParams>;
};

export type VariantResource = VariantOwnResource | VariantExtendResource;
