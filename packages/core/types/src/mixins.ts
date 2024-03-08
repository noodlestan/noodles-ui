import { Resource } from './resource';

export type MixinResource = Resource<'mixin'> & {
    role: string;
    source: string;
    implementation: string;
};

export type MixinInlineResource = Omit<MixinResource, 'type' | 'module'>;
