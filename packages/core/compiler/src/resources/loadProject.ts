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
    const { type, name, module, generate } = project;
    compiler.project = { type, name, module, generate };
};

export const loadProject = async (
    compiler: CompilerContext,
    project: ProjectResource,
    options: CompilerOptions,
): Promise<void> => {
    loadProjectEntity(compiler, project);
    loadSystem(compiler, project);
    loadSurfaces(compiler, project);
    loadMixins(compiler, project);
    loadVariants(compiler, project);
    loadComponents(compiler, project);
    loadTokens(compiler, project);
    await loadThemes(compiler, project, options);
};
