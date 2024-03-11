import { ComponentOwnInstance } from '@noodles-ui/core-types';

import { Props } from '../extendComponent';

import { getRenderedPart } from './getRenderedPart';

export const getRenderedProps = (component: ComponentOwnInstance): Props => {
    const part = getRenderedPart(component);

    return part?.props || {};
};
