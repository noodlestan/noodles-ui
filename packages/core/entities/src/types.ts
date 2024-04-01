import { ComponentEntity } from './component';
import { MixinEntity } from './mixin';
import { SurfaceEntity } from './surface';
import { SystemEntity } from './system';
import { ThemeEntity } from './theme';
import { TokenEntity } from './token';
import { VariantEntity } from './variant';

export type EntityType =
    | 'system'
    | 'surface'
    | 'mixin'
    | 'variant'
    | 'component'
    | 'token'
    | 'theme';

export type UnknownEntity =
    | SystemEntity
    | SurfaceEntity
    | MixinEntity
    | VariantEntity
    | ComponentEntity
    | TokenEntity
    | ThemeEntity;
