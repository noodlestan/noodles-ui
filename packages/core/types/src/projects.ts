import { ComponentResource } from './components';
import { MixinResource } from './mixins';
import { Resource } from './resource';
import { SurfaceResource } from './surfaces';
import { ThemeResource } from './themes';
import { VariantResource } from './variants';

export type ProjectOwnResource = Resource<'project'> & {
    use: MixinResource[];
};

type ResourceMap = {
    surfaces: SurfaceResource[];
    mixins: MixinResource[];
    variants: VariantResource[];
    components: ComponentResource[];
    themes: ThemeResource[];
};

export type ProjectResource = ProjectOwnResource & {
    resources: ResourceMap;
};
