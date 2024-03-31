import { SurfaceColor } from '@noodles-ui/core-styled';
import { ProjectResource } from '@noodles-ui/core-types';

import components from './components/components.nui';
import surfaces from './surfaces/surfaces.nui';
import themes from './themes/themes.nui';
import variants from './variants/variants.nui';

const LabUIResource: ProjectResource = {
    type: 'project',
    name: 'Lab UI',
    module: '@noodles-ui/lab-ui',
    use: [SurfaceColor],
    entities: {
        surfaces,
        mixins: [],
        variants,
        components,
        themes,
    },
};

export default LabUIResource;
