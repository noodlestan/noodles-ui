import { BuildSnapshotDto, ComponentContextWithInstance, NUI } from '@noodles-ui/support-types';

import { entitiesByType } from './entitiesByType';

export const components = (
    snapshot?: BuildSnapshotDto | undefined,
): ComponentContextWithInstance[] =>
    entitiesByType<ComponentContextWithInstance>(snapshot, NUI.component);
