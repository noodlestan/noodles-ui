import { ComponentResource } from '../component';
import { MixinResource } from '../mixin';
import { SurfaceResource } from '../surface';
import { ThemeResource } from '../theme';
import { Resource } from '../types';
import { VariantResource } from '../variant';

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
