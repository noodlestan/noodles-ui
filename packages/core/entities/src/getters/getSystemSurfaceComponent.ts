import { getResourceKey } from '@noodles-ui/core-resources';

import { NUI } from '..';
import { ComponentBuildContext, ProjectEntities } from '../project-entities';

import { getEntityByKey } from './getEntityByKey';
import { getSystem } from './getSystem';

export const getSystemSurfaceComponent = (
    context?: ProjectEntities,
): ComponentBuildContext | undefined => {
    const system = getSystem(context);
    const resource = system.entity.surface?.component;
    const componentKey = resource && getResourceKey(resource);
    const surfaceComponent =
        componentKey !== undefined &&
        getEntityByKey<ComponentBuildContext>(context, NUI.component, componentKey);
    return typeof surfaceComponent === 'object' ? surfaceComponent : undefined;
};
