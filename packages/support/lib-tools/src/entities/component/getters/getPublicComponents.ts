import {
    ComponentBuildContext,
    CompilerContext as ProjectEntities,
} from '@noodles-ui/support-types';

export const getPublicComponents = (project: ProjectEntities): ComponentBuildContext[] => {
    return Array.from(project.entities.component.values()).filter(item => item.context.public);
};
