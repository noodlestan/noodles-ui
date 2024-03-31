import { ProjectEntities } from '../../compiler';
import { NUI } from '../../constants';
import { ComponentBuildContext } from '../types';

import { getEntitiesByType } from './getEntitiesByType';

export const getComponents = (context?: ProjectEntities | undefined): ComponentBuildContext[] =>
    getEntitiesByType<ComponentBuildContext>(context, NUI.component);
