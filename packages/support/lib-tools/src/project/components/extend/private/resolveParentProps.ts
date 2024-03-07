import { ComponentExtendResource, ComponentResource, ExtendParams } from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../../types/projects';
import { Props } from '../extendComponent';
import { isComponentGeneratedResource } from '../isComponentGeneratedResource';

import { getRenderedProps } from './getRenderedProps';
import { mergeProps } from './mergeProps';

export const resolveParentProps = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
    parent: ComponentResource,
    parentParams: ExtendParams,
): Props => {
    const generated = isComponentGeneratedResource(parent);
    if (generated) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return mergeProps(
            project,
            context,
            parent,
            getRenderedProps(project, context, generated),
            parentParams,
        );
    } else {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return mergeProps(project, context, parent, {}, parentParams);
    }
};
