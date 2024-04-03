import { LocalPropResource } from '@noodles-ui/core-resources';

import { ComponentRenderEntity } from '../types';

import { getComponentRenderedPart } from './getComponentRenderedPart';

export type Props = {
    [name: string]: LocalPropResource;
};

export const getComponentRenderedProps = (component: ComponentRenderEntity): Props => {
    const part = getComponentRenderedPart(component);

    return part?.props || {};
};
