import { ProjectResource } from '@noodles-ui/core-resources';

import { CompilerContext, CompilerOptions } from '../types';

import { loadComponents } from './component/loadComponents';
import { loadMixins } from './mixin/loadMixins';
import { loadSurfaces } from './surface/loadSurfaces';
import { loadSystem } from './system/loadSystem';
import { loadThemes } from './theme/loadThemes';
import { loadTokens } from './token/loadTokens';
import { loadVariants } from './variant/loadVariants';

export const loadProjectEntity = (compiler: CompilerContext, project: ProjectResource): void => {
    compiler.project = project;
};

export const loadProject = async (
    compiler: CompilerContext,
    project: ProjectResource,
    options: CompilerOptions,
): Promise<void> => {
    loadProjectEntity(compiler, project);
    loadSystem(compiler);
    loadSurfaces(compiler);
    loadMixins(compiler);
    loadVariants(compiler);
    loadComponents(compiler);
    loadTokens(compiler);
    await loadThemes(compiler, options);
};
