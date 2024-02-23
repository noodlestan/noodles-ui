import { ComponentResource } from './components';
import { SurfaceResource } from './surfaces';
import { ThemeResource } from './themes';
import { VariantResource } from './variants';

export type ProjectResource = {
    components: ComponentResource[];
    surfaces: SurfaceResource[];
    themes: ThemeResource[];
    variants: VariantResource[];
};
