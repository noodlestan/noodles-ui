import { ProjectSnapshot } from '@noodles-ui/support-types';

export const deseralizeSnapshot = (contents: Buffer): ProjectSnapshot => {
    const { surfaces, themes, components, variants, tokens } = JSON.parse(contents.toString());

    return {
        surfaces: new Map(Object.entries(surfaces)),
        themes: new Map(Object.entries(themes)),
        components: new Map(Object.entries(components)),
        variants: new Map(Object.entries(variants)),
        tokens: new Map(Object.entries(tokens)),
    };
};
