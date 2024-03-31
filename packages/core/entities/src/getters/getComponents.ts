import { NUI } from '../constants';
import { ComponentBuildContext, ProjectEntities } from '../project-entities';

import { getEntitiesByType } from './getEntitiesByType';

export const getComponents = (context?: ProjectEntities | undefined): ComponentBuildContext[] =>
    getEntitiesByType<ComponentBuildContext>(context, NUI.component);
