import { ComponentResource } from '../component';
import { MixinResource } from '../mixin';
import { SurfaceResource } from '../surface';
import { InlineSystemResource } from '../system';
import { ThemeResource } from '../theme';
import { TokenResource } from '../token';
import { Resource } from '../types';
import { VariantResource } from '../variant';

export type ProjectOwnResource = Resource<'project'>;

type ResourceMap = {
    surfaces?: SurfaceResource[];
    mixins?: MixinResource[];
    variants?: VariantResource[];
    components?: ComponentResource[];
    tokens?: TokenResource[];
    themes?: ThemeResource[];
};

export type ProjectResource = ProjectOwnResource & {
    system?: InlineSystemResource;
    resources: ResourceMap;
};
