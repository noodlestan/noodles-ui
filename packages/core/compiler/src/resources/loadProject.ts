import { ProjectResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../context/newResourceContextPublic';
import { CompilerContext, CompilerOptions } from '../types';

import { loadComponents } from './components/loadComponents';
import { loadMixins } from './mixins/loadMixins';
import { loadSurfaces } from './surfaces/loadSurfaces';
import { loadThemes } from './themes/loadThemes';
import { loadTokens } from './tokens/loadTokens';
import { loadVariants } from './variants/loadVariants';

export const loadProject = async (
    compiler: CompilerContext,
    project: ProjectResource,
    options: CompilerOptions,
): Promise<void> => {
    const context = newResourceContextPublic(project);
    const entity = structuredClone(project);
    compiler.entities.project.set('', { context, entity });

    loadSurfaces(compiler, project);
    loadMixins(compiler, project);
    loadVariants(compiler, project);
    loadComponents(compiler, project);
    loadTokens(compiler, project);
    await loadThemes(compiler, project, options);
};
