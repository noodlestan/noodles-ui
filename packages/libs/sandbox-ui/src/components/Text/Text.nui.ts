import { TextResource as TextStyledResource } from '@noodles-ui/core-styled';
import { ComponentResource } from '@noodles-ui/core-types';

export const TextResource: ComponentResource = {
    type: 'component',
    name: 'Text',
    extend: TextStyledResource,
};
