import { ComponentGeneratedResource } from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { Props } from '../extendComponent';

export const getRenderedProps = (
    project: ProjectContext,
    context: ComponentContext,
    parent: ComponentGeneratedResource,
): Props => {
    const { from, name } = parent.render;

    const { parts } = from;

    const part = parts.find(part => part.name === name);

    if (!part) {
        project.addDiagnostic(
            context.resource,
            `Could not extend component with a default prop. Parent does not expose "${name}".`,
        );
    }

    return part?.props || {};
};
