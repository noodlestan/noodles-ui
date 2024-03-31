import { ComponentResource, ProjectResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';

import { loadComponent } from './loadComponent';

export const loadComponents = (compiler: CompilerContext, project: ProjectResource): void => {
    const { components } = project.resources;
    components.forEach(component => {
        const context = newResourceContextPublic<ComponentResource>(component);
        loadComponent(compiler, context);
    });
};
