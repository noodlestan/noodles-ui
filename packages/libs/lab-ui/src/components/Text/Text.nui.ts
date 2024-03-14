// import { TypographyVariant } from '@noodles-ui/core-styled';
// import { ComponentOwnResource, VariantExtendResource } from '@noodles-ui/core-types';
// import { TextResource as TextUnstyledResource } from '@noodles-ui/core-unstyled';

// export const TextTypeVariantResource: VariantExtendResource = {
//     module: '@noodles-ui/core-styled',
//     name: 'TextVariant',
//     extend: TypographyVariant,
//     options: ['large', 'medium', 'body', 'note'],
//     defaultValue: 'body',
// };

// export const TextResource: ComponentOwnResource = {
//     type: 'component',
//     name: 'Text',
//     module: '@noodles-ui/lab-ui',
//     // exposes: ['tag', 'children'],
//     props: {
//         something: {
//             defaultValue: 'something else',
//         },
//         variant: TextTypeVariantResource,
//     },
//     hides: {},
//     render: {
//         name: 'Text',
//         from: TextUnstyledResource,
//     },
// };
import { TextResource as TextStyledResource } from '@noodles-ui/core-styled';
import { ComponentExtendResource } from '@noodles-ui/core-types';

export const TextResource: ComponentExtendResource = {
    module: '@noodles-ui/lab-ui',
    extend: TextStyledResource,
    hides: {
        classList: {},
        style: {},
    },
    overrides: {
        variant: {
            name: 'TextVariant',
            options: ['small', 'medium', 'large', 'x-large'],
            vars: { family: 'text' },
            defaultValue: 'medium',
        },
        tag: {
            name: 'TextTag',
            options: ['p', 'span'],
        },
    },
};
