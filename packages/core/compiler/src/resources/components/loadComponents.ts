import { ComponentResource, ProjectResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { loadComponent } from './loadComponent';

export const loadComponents = (compiler: CompilerContext, project: ProjectResource): void => {
    const { components } = project.resources;
    components.forEach(component => {
        const context = newResourceContextPublic<ComponentResource>(component);
        loadComponent(compiler, context);
    });
};
