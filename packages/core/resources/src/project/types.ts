import { ComponentResource } from '../component';
import { MixinResource } from '../mixin';
import { SurfaceResource } from '../surface';
import { InlineSystemResource } from '../system';
import { ThemeResource } from '../theme';
import { TokenResource } from '../token';
import { Resource } from '../types';
import { VariantResource } from '../variant';

export type ProjectResource = Resource<'project'> & {
    system?: InlineSystemResource;
};

type ResourceMap = {
    surfaces?: SurfaceResource[];
    mixins?: MixinResource[];
    variants?: VariantResource[];
    components?: ComponentResource[];
    tokens?: TokenResource[];
    themes?: ThemeResource[];
};

export type NUIProjectResource = ProjectResource & {
    resources: ResourceMap;
};
