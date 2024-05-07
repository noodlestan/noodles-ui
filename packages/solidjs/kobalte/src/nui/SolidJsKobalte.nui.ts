import { NUIProjectResource } from '@noodles-ui/core-resources';

import { AccordionResource } from '../components/index.nui';

const LabUIResource: NUIProjectResource = {
    type: 'project',
    name: 'Solid JS Kobalte',
    module: '@noodles-ui/solidjs-kobalte',
    resources: {
        components: [AccordionResource],
    },
};

export default LabUIResource;
