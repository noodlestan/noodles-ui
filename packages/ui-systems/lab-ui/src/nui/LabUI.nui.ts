import { ProjectResource } from '@noodles-ui/core-resources';
import { SurfaceColorResource } from '@noodles-ui/solidjs-styled';

import components from './components/components.nui';
import surfaces from './surfaces/surfaces.nui';
import themes from './themes/themes.nui';
import variants from './variants/variants.nui';

const LabUIResource: ProjectResource = {
    type: 'project',
    name: 'Lab UI',
    module: '@noodles-ui/lab-ui',
    generate: true,
    system: {
        use: [SurfaceColorResource],
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
