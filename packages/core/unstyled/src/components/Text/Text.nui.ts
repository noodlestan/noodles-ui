import { ComponentResource } from '@noodles-ui/core-types';

export const TextResource: ComponentResource = {
    type: 'component',
    name: 'Text',
    props: {
        tag: {
            type: 'prop:list',
            options: ['p'],
            defaultOption: 'p',
        },
    },
};
