import { Accessor, createSignal } from 'solid-js';

import { ThemesError } from '../errors/ThemesError';
import { Surface } from '../types';

const [surfaces, setSurfaces] = createSignal<Surface[]>([]);

type SurfacesStore = {
    surfaces: Accessor<Surface[]>;
    registerSurface: (theme: Surface) => void;
    surfaceByName: (name: string) => Surface;
};

const findSurface = (name: string): Surface | undefined => {
    return surfaces().find(surface => surface.name === name);
};

const surfaceByName = (name: string): Surface => {
    const found = findSurface(name);
    if (!found) {
        throw new ThemesError(`Unknown surface "${name}".`);
    }
    return found;
};

const registerSurface = (surface: Surface): void => {
    if (!findSurface(surface.name)) {
        setSurfaces(s => [...s, surface]);
    }
};

export const surfacesStore: SurfacesStore = {
    surfaces,
    surfaceByName,
    registerSurface,
};
