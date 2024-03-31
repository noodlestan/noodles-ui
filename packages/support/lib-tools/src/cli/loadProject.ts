import { ProjectResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { newResourceContextPublic } from '../compiler/context/newResourceContextPublic';
import { loadComponents } from '../compiler/resources/components/loadComponents';
import { loadMixins } from '../compiler/resources/mixins/loadMixins';
import { loadSurfaces } from '../compiler/resources/surfaces/loadSurfaces';
import { loadThemes } from '../compiler/resources/themes/loadThemes';
import { loadTokens } from '../compiler/resources/tokens/loadTokens';
import { loadVariants } from '../compiler/resources/variants/loadVariants';

import { BuildOptions } from './types';

export const loadProject = async (
    compiler: CompilerContext,
    project: ProjectResource,
    options: BuildOptions,
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
