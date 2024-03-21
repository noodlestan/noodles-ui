import { ComponentOwnEntity } from '@noodles-ui/core-types';

import { Props } from '../../../project/resources/components/private/extendComponent';

import { getRenderedPart } from './getRenderedPart';

export const getRenderedProps = (component: ComponentOwnEntity): Props => {
    const part = getRenderedPart(component);

    return part?.props || {};
};
