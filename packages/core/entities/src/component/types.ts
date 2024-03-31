import {
    ComponentImportResource,
    ComponentOwnResource,
    ComponentVars,
    MixinResource,
} from '@noodles-ui/core-resources';

import { PropEntity } from '../prop';

export type ComponentEntityProps = {
    [name: string]: PropEntity;
};

export type ComponentOwnEntity = Omit<ComponentOwnResource, 'use' | 'props'> & {
    use: MixinResource[];
    props: ComponentEntityProps;
    vars: ComponentVars;
};

export type ComponentImportEntity = Omit<ComponentImportResource, 'use' | 'props'> & {
    props: ComponentEntityProps;
};

export type ComponentEntity = ComponentOwnEntity | ComponentImportEntity;
