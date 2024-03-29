import { BuildSnapshotDto, ComponentBuildContextDto, NUI } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const components = (snapshot?: BuildSnapshotDto | undefined): ComponentBuildContextDto[] =>
    entitiesByType<ComponentBuildContextDto>(snapshot, NUI.component);
