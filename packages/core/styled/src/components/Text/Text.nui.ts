import { ComponentGeneratedResource, VariantExtendResource } from '@noodles-ui/core-types';
import { TextResource as TextUnstyledResource } from '@noodles-ui/core-unstyled';

import { TypeReset } from '../../mixins/index.nui';
import { TypeVariant } from '../../variants/index.nui';

export const TextTypeVariantResource: VariantExtendResource = {
    module: '@noodles-ui/core-styled',
    name: 'TextVariant',
    extend: [
        TypeVariant,
        {
            family: '#{}',
        },
    ],
    params: ['family'],
    options: ['large', 'medium', 'body', 'note'],
    defaultOption: 'body',
};

export const TextResource: ComponentGeneratedResource = {
    type: 'component',
    name: 'Text',
    module: '@noodles-ui/core-styled',
    params: ['family'],
    generated: true,
    use: [TypeReset],
    props: {
        variant: TextTypeVariantResource,
    },
    render: {
        name: 'Text',
        from: TextUnstyledResource,
    },
    hides: {},
};
