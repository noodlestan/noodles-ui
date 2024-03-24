import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';

import { BuildOptions } from '../build/types';
import { loadComponents } from '../project/resources/components/loadComponents';
import { loadSurfaces } from '../project/resources/surfaces/loadSurfaces';
import { loadThemes } from '../project/resources/themes/loadThemes';
import { loadTokens } from '../project/resources/tokens/loadTokens';
import { loadVariants } from '../project/resources/variants/loadVariants';

export const loadProject = (
    project: ProjectContext,
    resource: ProjectResource,
    options: BuildOptions,
): void => {
    const { name, module } = resource;
    project.resource = { name, module };

    loadSurfaces(project, resource);
    loadVariants(project, resource);
    loadComponents(project, resource);
    loadTokens(project, resource);
    loadThemes(project, resource, options);
};
