import { LocalPropResource } from '@noodles-ui/core-resources';

import { ComponentOwnEntity } from '../types';

import { getComponentRenderedPart } from './getComponentRenderedPart';

export type Props = {
    [name: string]: LocalPropResource;
};

export const getComponentRenderedProps = (component: ComponentOwnEntity): Props => {
    const part = getComponentRenderedPart(component);

    return part?.props || {};
};
