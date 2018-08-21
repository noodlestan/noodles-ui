import { Accessor, createSignal } from 'solid-js';

import { surfacesStore } from '../../stores/surfacesStore';
import { Surface } from '../../types';

const [surface, setSurface] = createSignal<string>('');

type SurfaceStore = {
    surface: Accessor<Surface>;
    setSurface: (name: string) => void;
};

const { findSurface } = surfacesStore;

export const surfaceStore: SurfaceStore = {
    surface: () => findSurface(surface()),
    setSurface: (name: string) => {
        findSurface(name);
        setSurface(name);
    },
};
