import { InlineTokenResource } from '../token/types';
import { Resource } from '../types';

type MixinRole = 'scss:mixin' | 'scss:variant';

export type MixinVars = {
    [key: string]: string | string[];
};

export type MixinResource = Resource<'mixin'> & {
    role: MixinRole;
    source: string;
    implementation: string;
    params?: string[];
    vars?: MixinVars;
    surface?: boolean;
    tokens?: Array<InlineTokenResource>;
};

export type MixinInlineResource = Omit<MixinResource, 'type' | 'module'>;
