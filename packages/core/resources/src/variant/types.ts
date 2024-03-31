import { Value } from '@noodles-ui/core-types';

import { MixinInlineResource } from '../mixin';
import { InlineTokenResource } from '../token/types';
import { Resource } from '../types';

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
