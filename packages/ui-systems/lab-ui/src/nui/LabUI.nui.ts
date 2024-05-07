import { NUIProjectResource } from '@noodles-ui/core-resources';
import { SurfaceColorResource } from '@noodles-ui/solidjs-styled';

import { SurfaceResource } from './components/Surface/Surface.nui';
import components from './components/components.nui';
import surfaces from './surfaces/surfaces.nui';
import themes from './themes/themes.nui';
import variants from './variants/variants.nui';

const LabUIResource: NUIProjectResource = {
    type: 'project',
    name: 'Lab UI',
    module: '@noodles-ui/lab-ui',
    system: {
        use: [SurfaceColorResource],
        surface: {
            component: SurfaceResource,
        },
    },
    resources: {
        surfaces,
        mixins: [],
        variants,
        components,
        themes,
    },
};

export default LabUIResource;
