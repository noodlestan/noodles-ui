import { Surface } from '@noodles-ui/core-services';

const stage: Surface = {
    name: 'stage',
    extends: [],
};

const page: Surface = {
    name: 'page',
    extends: ['stage'],
};

const dialog: Surface = {
    name: 'dialog',
    extends: ['page'],
};

const card: Surface = {
    name: 'card',
    extends: ['page'],
};

const banner: Surface = {
    name: 'banner',
    extends: ['page'],
};

const inverse: Surface = {
    name: 'inverse',
    extends: ['stage'],
};

export default [stage, page, dialog, card, banner, inverse];
