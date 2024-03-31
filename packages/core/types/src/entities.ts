import { ComponentEntity } from './components';
import { MixinResource } from './mixins';
import { ProjectResource } from './projects';
import { SurfaceResource } from './surfaces';
import { ThemeEntity } from './themes';
import { TokenEntity } from './tokens';
import { VariantEntity } from './variants';

export type UnknownEntity =
    | ProjectResource
    | SurfaceResource
    | MixinResource
    | VariantEntity
    | ComponentEntity
    | TokenEntity
    | ThemeEntity;
