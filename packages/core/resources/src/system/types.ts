import { MixinResource } from '../mixin';
import { Resource } from '../types';

export type SystemResource = Resource<'system'> & {
    use?: MixinResource[];
};

export type InlineSystemResource = Omit<SystemResource, 'type' | 'name' | 'module'>;
