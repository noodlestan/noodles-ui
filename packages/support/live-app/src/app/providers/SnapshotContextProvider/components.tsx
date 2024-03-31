import { BuildSnapshot, ComponentBuildContext, NUI } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const components = (snapshot?: BuildSnapshot | undefined): ComponentBuildContext[] =>
    entitiesByType<ComponentBuildContext>(snapshot, NUI.component);
