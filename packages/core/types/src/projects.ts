import { ComponentResource } from './components';
import { MixinResource } from './mixins';
import { Resource } from './resource';
import { SurfaceResource } from './surfaces';
import { ThemeResource } from './themes';
import { VariantResource } from './variants';

export type ProjectOwnResource = Resource<'project'>;

type EntityResourceMap = {
    components: ComponentResource[];
    surfaces: SurfaceResource[];
    themes: ThemeResource[];
    variants: VariantResource[];
    mixins: MixinResource[];
};

export type ProjectResource = ProjectOwnResource & {
    entities: EntityResourceMap;
};
