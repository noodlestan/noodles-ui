import { ComponentResource } from '@noodles-ui/core-types';
import ts from 'typescript';

import { getPropType } from '../../../../project/props/getPropType';
import { WithInstance } from '../../../../types/projects';
import { factory } from '../exportComponentProps';

export const getComponentProps = (
    component: WithInstance<ComponentResource>,
): ts.PropertySignature[] => {
    const { instance } = component;
    return Object.entries(instance.props || {}).map(([name, prop]) => {
        const type = getPropType(name, prop);
        return factory.createPropertySignature(
            undefined,
            factory.createIdentifier(name),
            undefined,
            type,
        );
    });
};
