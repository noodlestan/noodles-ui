import { BuildSnapshotDto, ComponentBuildContext, NUI } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const components = (snapshot?: BuildSnapshotDto | undefined): ComponentBuildContext[] =>
    entitiesByType<ComponentBuildContext>(snapshot, NUI.component);
