import { ComponentGeneratedResource } from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { Props } from '../extendComponent';

import { getRenderedPart } from './getRenderedPart';

export const getRenderedProps = (
    project: ProjectContext,
    context: ComponentContext,
    parent: ComponentGeneratedResource,
): Props => {
    const part = getRenderedPart(project, context, parent);

    return part?.props || {};
};
