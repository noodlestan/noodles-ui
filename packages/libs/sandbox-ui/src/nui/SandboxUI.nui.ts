import { ProjectResource } from '@noodles-ui/core-types';

import components from './components.nui';
import surfaces from './surfaces.nui';
import themes from './themes.nui';
import variants from './variants.nui';

const SandboxUIResource: ProjectResource = {
    type: 'project',
    name: 'Sandbox UI',
    module: '@noodles-ui/sandbox-ui',
    themes,
    surfaces,
    variants,
    components,
};

export default SandboxUIResource;
