import { MixinResource } from '@noodles-ui/core-resources';

export const TypeReset: MixinResource = {
    type: 'mixin',
    name: 'TypeReset',
    module: '@noodles-ui/solidjs-styled',
    role: 'scss:mixin',
    source: '@noodles-ui/solidjs-styled/src/mixins/TypeReset/TypeReset.scss',
    implementation: '@include TypeReset();',
};
