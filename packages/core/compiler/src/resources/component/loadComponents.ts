import { ComponentResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { loadComponent } from './loadComponent';

export const loadComponents = (compiler: CompilerContext): void => {
    const { components = [] } = compiler.project.resources;
    components.forEach(component => {
        const context = newResourceContextPublic<ComponentResource>(component);
        loadComponent(compiler, context);
    });
};
