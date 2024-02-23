import { ExtendWithParams } from './primitives/utils';
import { TokenResource } from './tokens';

type VariantExtendParams = {
    params: { [key: string]: string };
};

export type VariantExtendResource = Partial<VariantOwnResource> & {
    extend: VariantResource | ExtendWithParams<VariantResource, VariantExtendParams>;
};

export type VariantOwnResource = {
    type: 'variant';
    name: string;
    attribute?: string;
    options?: string[];
    defaultOption?: string;
    vars?: {
        [key: string]: string[];
    };
    params?: string[];
    surface?: boolean;
    tokens: TokenResource[];
};

export type VariantResource = VariantOwnResource | VariantExtendResource;
