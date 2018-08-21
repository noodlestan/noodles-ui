import { Text as Component } from './Text';

export const TextMeta = {
    type: 'component',
    name: 'Text',
    component: Component,
    props: {
        tag: {
            options: ['p'],
            defaultOption: 'p',
        },
    },
};
