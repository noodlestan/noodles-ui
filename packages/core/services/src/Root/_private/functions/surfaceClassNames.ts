import { SURFACE_PREFIX } from '../../constants';
import { useSurfacesContext } from '../../providers/SurfaceProvider';
import { surfacesStore } from '../../stores/surfacesStore';
import { Surface } from '../../types';

import { makeNoodlesClassName } from './makeNoodlesClassName';

const surfaceNames = (surface: Surface): string[] => {
    const { findSurface } = surfacesStore;

    return [surface.name, ...surface.extends.flatMap(s => surfaceNames(findSurface(s)))];
};

export const surfaceClassNames = (): string[] => {
    const { surface } = useSurfacesContext();

    return [
        makeNoodlesClassName(SURFACE_PREFIX),
        ...surfaceNames(surface()).map(s => makeNoodlesClassName(SURFACE_PREFIX, s)),
    ];
};
