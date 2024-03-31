import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../build/types';
import { loadComponents } from '../project/resources/components/loadComponents';
import { loadMixins } from '../project/resources/mixins/loadMixins';
import { loadSurfaces } from '../project/resources/surfaces/loadSurfaces';
import { loadThemes } from '../project/resources/themes/loadThemes';
import { loadTokens } from '../project/resources/tokens/loadTokens';
import { loadVariants } from '../project/resources/variants/loadVariants';

export const loadProject = async (
    project: ProjectContext,
    resource: ProjectResource,
    options: BuildOptions,
): Promise<void> => {
    const { name, module, use } = resource;
    project.entities.project = { name, module, use };

    loadSurfaces(project, resource);
    loadMixins(project, resource);
    loadVariants(project, resource);
    loadComponents(project, resource);
    loadTokens(project, resource);
    await loadThemes(project, resource, options);
};
