import { ProjectResource } from '@noodles-ui/core-resources';

import {
    HeadingResource,
    LayoutFlexResource,
    SurfaceResource,
    TextResource,
} from '../components/index.nui';
import { SurfaceColorResource, TypeResetResource } from '../index.nui';
import { SurfaceBorderResource } from '../mixins/SurfaceBorder/SurfaceBorder.nui';

const LabUIResource: ProjectResource = {
    type: 'project',
    name: 'Solid JS Styled',
    module: '@noodles-ui/solidjs-styled',
    resources: {
        mixins: [SurfaceBorderResource, SurfaceColorResource, TypeResetResource],
        components: [HeadingResource, LayoutFlexResource, SurfaceResource, TextResource],
    },
};

export default LabUIResource;
