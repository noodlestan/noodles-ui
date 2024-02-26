import { SURFACE_PREFIX } from '../../constants';
import { useSurfacesContext } from '../../providers/SurfaceProvider';
import { surfacesStore } from '../../stores/surfacesStore';
import { Surface } from '../../types';

import { makeNoodlesClassName } from './makeNoodlesClassName';

const surfaceNames = (surface: Surface): string[] => {
    const { surfaceByName } = surfacesStore;

    return [surface.name, ...surface.extend.flatMap(s => surfaceNames(surfaceByName(s)))];
};

export const surfaceClassNames = (): string[] => {
    const { surface } = useSurfacesContext();

    return surfaceNames(surface()).map(s => makeNoodlesClassName(SURFACE_PREFIX, s));
};
