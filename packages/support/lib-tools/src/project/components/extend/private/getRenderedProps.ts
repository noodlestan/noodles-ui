import { ComponentOwnInstance } from '@noodles-ui/core-types';

import { Props } from '../extendComponent';

import { getRenderedPart } from './getRenderedPart';

export const getRenderedProps = (parent: ComponentOwnInstance): Props => {
    const part = getRenderedPart(parent);

    return part?.props || {};
};
