import { ResourceContext, UnknownResource } from '@noodles-ui/core-resources';

import { UnknownEntity } from '../types';

export type EntityBuildContext<T, V> = {
    context: T;
    entity: V;
};

export type UnknownBuildContext = EntityBuildContext<
    ResourceContext<UnknownResource>,
    UnknownEntity
>;

export type EntityBuildMap<
    T extends EntityBuildContext<ResourceContext<UnknownResource>, UnknownResource>,
> = Map<string, T>;
