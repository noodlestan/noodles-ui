import {
    ComponentImportPartResource,
    ComponentImportResource,
    ComponentOwnResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';

export const getRenderedPart = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentOwnResource,
    rendered?: ComponentImportResource,
): ComponentImportPartResource | undefined => {
    const { from, name } = component.render;

    const { parts } = rendered ?? from;

    const part = parts.find(part => part.name === name);

    return part;
};
