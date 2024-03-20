import { Resource } from './resource';

type MixinRole = 'scss:mixin' | 'scss:variant';

export type MixinResource = Resource<'mixin'> & {
    role: MixinRole;
    source: string;
    implementation: string;
    params?: string[];
};

export type MixinInlineResource = Omit<MixinResource, 'type' | 'module'>;
