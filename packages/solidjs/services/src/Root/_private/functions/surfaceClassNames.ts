import { NUI_SURFACE_PREFIX, Surface, makeNoodlesClassName } from '@noodles-ui/core-types';

import { useSurfacesContext } from '../../providers/SurfaceProvider';
import { surfacesStore } from '../../stores/surfacesStore';

const surfaceNames = (surface: Surface): string[] => {
    const { surfaceByName } = surfacesStore;

    return [surface.name, ...surface.extend.flatMap(s => surfaceNames(surfaceByName(s)))];
};

export const surfaceClassNames = (): string[] => {
    const { surface } = useSurfacesContext();

    return surfaceNames(surface()).map(s => makeNoodlesClassName(NUI_SURFACE_PREFIX, s));
};
