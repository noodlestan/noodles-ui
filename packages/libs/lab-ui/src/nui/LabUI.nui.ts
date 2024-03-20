import { ProjectResource } from '@noodles-ui/core-types';

import components from './entities/components.nui';
import surfaces from './entities/surfaces.nui';
import themes from './entities/themes.nui';
import variants from './entities/variants.nui';

const LabUIResource: ProjectResource = {
    type: 'project',
    name: 'Lab UI',
    module: '@noodles-ui/lab-ui',
    entities: {
        themes,
        surfaces,
        variants,
        components,
        mixins: [],
    },
};

export default LabUIResource;
