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

import { buildProgram } from './createProgram';

export const createProject = async (projectFile: string): Promise<ProjectContext> => {
    const build = await buildProgram(projectFile);

    const projectPath = dirname(projectFile);
    const rootPath = findRootPath(projectPath);

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
