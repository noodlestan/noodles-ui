import { ComponentResource } from '../component';
import { MixinResource } from '../mixin';
import { Resource } from '../types';

export type SystemResource = Resource<'system'> & {
    use?: MixinResource[];
    surface?: {
        component: ComponentResource;
    };
};

export type InlineSystemResource = Omit<SystemResource, 'type' | 'name' | 'module'>;
