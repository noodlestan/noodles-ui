import {
    ComponentImportResource,
    ComponentRenderResource,
    ComponentVars,
    MixinResource,
} from '@noodles-ui/core-resources';

import { PropEntity } from '../prop';

export type ComponentEntityProps = {
    [name: string]: PropEntity;
};

export type ComponentRenderEntity = Omit<ComponentRenderResource, 'use' | 'props'> & {
    use: MixinResource[];
    props: ComponentEntityProps;
    vars: ComponentVars;
};

export type ComponentImportEntity = Omit<ComponentImportResource, 'use' | 'props'> & {
    props: ComponentEntityProps;
};

export type ComponentEntity = ComponentRenderEntity | ComponentImportEntity;
