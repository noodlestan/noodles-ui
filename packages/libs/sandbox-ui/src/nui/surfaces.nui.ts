import { SurfaceResource } from '@noodles-ui/core-types';

const stage: SurfaceResource = {
    type: 'surface',
    name: 'stage',
    module: '@noodles-ui/sandbox-ui',
    extend: [],
};

// const page: SurfaceResource = {
//     type: 'surface',
//     name: 'page',
//     module: '@noodles-ui/sandbox-ui',
//     extend: ['stage'],
// };

// const dialog: SurfaceResource = {
//     type: 'surface',
//     name: 'dialog',
//     module: '@noodles-ui/sandbox-ui',
//     extend: ['page'],
// };

// const card: SurfaceResource = {
//     type: 'surface',
//     name: 'card',
//     module: '@noodles-ui/sandbox-ui',
//     extend: ['page'],
// };

// const banner: SurfaceResource = {
//     type: 'surface',
//     name: 'banner',
//     module: '@noodles-ui/sandbox-ui',
//     extend: ['page'],
// };

// const inverse: SurfaceResource = {
//     type: 'surface',
//     name: 'inverse',
//     module: '@noodles-ui/sandbox-ui',
//     extend: ['stage'],
// };

// export default [stage, page, dialog, card, banner, inverse];
export default [stage];
