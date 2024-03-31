import { CompilerContext, ComponentBuildContext } from '@noodles-ui/support-types';

export const getPublicComponents = (compiler: CompilerContext): ComponentBuildContext[] => {
    return Array.from(compiler.entities.component.values()).filter(item => item.context.public);
};
