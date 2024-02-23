import { ProjectResource } from '@noodles-ui/core-types';

import { ProjectContext } from '../../types/projects';

import { addComponent } from './addComponent';

export const loadComponents = (project: ProjectContext, meta: ProjectResource): void => {
    meta.components.forEach(component => {
        addComponent(component, project, { public: true });
    });
};
