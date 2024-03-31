import { ComponentEntity } from './component';
import { MixinEntity } from './mixin';
import { ProjectEntity } from './project';
import { SurfaceEntity } from './surface';
import { ThemeEntity } from './theme';
import { TokenEntity } from './token';
import { VariantEntity } from './variant';

export type EntityType =
    | 'project'
    | 'surface'
    | 'mixin'
    | 'variant'
    | 'component'
    | 'token'
    | 'theme';

export type UnknownEntity =
    | ProjectEntity
    | SurfaceEntity
    | MixinEntity
    | VariantEntity
    | ComponentEntity
    | TokenEntity
    | ThemeEntity;
