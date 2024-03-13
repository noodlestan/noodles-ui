import {
    ComponentContext,
    ProjectSnapshot,
    SurfaceContext,
    ThemeContext,
    TokenContext,
    VariantContext,
} from '../../../types/projects';

type SerializableSnapshot = {
    surfaces: {
        [k: string]: SurfaceContext;
    };
    themes: {
        [k: string]: ThemeContext;
    };
    components: {
        [k: string]: ComponentContext;
    };
    variants: {
        [k: string]: VariantContext;
    };
    tokens: {
        [k: string]: TokenContext;
    };
};
export const serializeSnapshot = (project: ProjectSnapshot): SerializableSnapshot => {
    const { surfaces, themes, components, variants, tokens } = project;
    const data = {
        surfaces: Object.fromEntries(surfaces),
        themes: Object.fromEntries(themes),
        components: Object.fromEntries(components),
        variants: Object.fromEntries(variants),
        tokens: Object.fromEntries(tokens),
    };
    return data;
};
