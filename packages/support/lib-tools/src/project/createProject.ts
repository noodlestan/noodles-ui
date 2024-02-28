import { dirname } from 'path';

import { findRootPath } from '../monorepo/findRootPath';
import {
    ComponentsContext,
    ProjectContext,
    SurfacesContext,
    ThemesContext,
    TokensContext,
    VariantsContext,
} from '../types/projects';

import { createProgram } from './createProgram';
import { findLocalNodeModule } from './findLocalNodeModule';

export const createProject = async (projectFile: string): Promise<ProjectContext> => {
    const module = findLocalNodeModule('/', projectFile); // TODO cross-platform
    const projectPath = module ? module.path : dirname(projectFile);
    const rootPath = findRootPath(projectPath);
    const build = await createProgram(projectFile, projectPath, rootPath);

    const themes: ThemesContext = { items: new Map() };
    const surfaces: SurfacesContext = { items: new Map() };
    const variants: VariantsContext = { items: new Map() };
    const components: ComponentsContext = { items: new Map() };
    const tokens: TokensContext = { items: new Map() };
    const project: ProjectContext = {
        projectFile,
        projectPath,
        rootPath,
        build,
        surfaces,
        themes,
        variants,
        components,
        tokens,
    };

    return project;
};
