import { Surface } from '@noodles-ui/core-services';

const stage: Surface = {
    name: 'stage',
    extend: [],
};

const page: Surface = {
    name: 'page',
    extend: ['stage'],
};

const dialog: Surface = {
    name: 'dialog',
    extend: ['page'],
};

const card: Surface = {
    name: 'card',
    extend: ['page'],
};

const banner: Surface = {
    name: 'banner',
    extend: ['page'],
};

const inverse: Surface = {
    name: 'inverse',
    extend: ['stage'],
};

export default [stage, page, dialog, card, banner, inverse];
