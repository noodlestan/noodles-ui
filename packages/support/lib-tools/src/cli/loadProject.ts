import { ProjectResource } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../build/types';
import { loadComponents } from '../project/resources/components/loadComponents';
import { loadMixins } from '../project/resources/mixins/loadMixins';
import { loadSurfaces } from '../project/resources/surfaces/loadSurfaces';
import { loadThemes } from '../project/resources/themes/loadThemes';
import { loadTokens } from '../project/resources/tokens/loadTokens';
import { loadVariants } from '../project/resources/variants/loadVariants';

export const loadProject = async (
    compiler: CompilerContext,
    project: ProjectResource,
    options: BuildOptions,
): Promise<void> => {
    const { name, module, use } = project;
    compiler.entities.project = { name, module, use };

    loadSurfaces(compiler, project);
    loadMixins(compiler, project);
    loadVariants(compiler, project);
    loadComponents(compiler, project);
    loadTokens(compiler, project);
    await loadThemes(compiler, project, options);
};
