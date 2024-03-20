import { MixinResource } from '@noodles-ui/core-types';

export const TypeReset: MixinResource = {
    type: 'mixin',
    name: 'TypeReset',
    module: '@noodles-ui/core-styled',
    role: 'scss:mixin',
    source: '@noodles-ui/core-styled/src/mixins/TypeReset/TypeReset.scss',
    implementation: '@include TypeReset();',
};
