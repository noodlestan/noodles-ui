import { LocalPropResource } from '@noodles-ui/core-resources';

import { ComponentOwnEntity } from '../types';

import { getRenderedPart } from './getRenderedPart';

export type Props = {
    [name: string]: LocalPropResource;
};

export const getRenderedProps = (component: ComponentOwnEntity): Props => {
    const part = getRenderedPart(component);

    return part?.props || {};
};
