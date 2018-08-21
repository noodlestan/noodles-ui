import { TextMeta as TextStyledMeta } from '@noodles-ui/core-styled';

import { Text as Component } from './Text';

export const TextMeta = {
    type: 'component',
    name: 'Text',
    extend: TextStyledMeta,
    component: Component,
};
