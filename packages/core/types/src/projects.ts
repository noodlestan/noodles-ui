import { ComponentResource } from './components';
import { Resource } from './resource';
import { SurfaceResource } from './surfaces';
import { ThemeResource } from './themes';
import { VariantResource } from './variants';

export type ProjectResource = Resource<'project'> & {
    components: ComponentResource[];
    surfaces: SurfaceResource[];
    themes: ThemeResource[];
    variants: VariantResource[];
};
