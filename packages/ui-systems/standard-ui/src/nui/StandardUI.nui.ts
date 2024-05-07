import { NUIProjectResource } from '@noodles-ui/core-resources';
import { SurfaceColorResource } from '@noodles-ui/solidjs-styled';
import { SurfaceResource } from '@noodles-ui/solidjs-unstyled';

const LabUIResource: NUIProjectResource = {
    type: 'project',
    name: 'Standard UI',
    module: '@noodles-ui/standard-ui',
    system: {
        use: [SurfaceColorResource],
        surface: {
            component: SurfaceResource,
        },
    },
    resources: {
        surfaces: [],
        mixins: [],
        variants: [],
        components: [],
        themes: [],
    },
};

export default LabUIResource;
