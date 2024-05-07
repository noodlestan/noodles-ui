import { NUIProjectResource } from '@noodles-ui/core-resources';

import { HeadingResource, SurfaceResource, TextResource } from '../components/index.nui';

const LabUIResource: NUIProjectResource = {
    type: 'project',
    name: 'Solid JS Unstyled',
    module: '@noodles-ui/solidjs-unstyled',
    resources: {
        components: [HeadingResource, TextResource, SurfaceResource],
    },
};

export default LabUIResource;
