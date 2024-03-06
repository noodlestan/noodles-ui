import { LocalPropResource } from '@noodles-ui/core-types';
import ts from 'typescript';

import { factory } from '../../generate/components/statements/exportComponentProps';

import { isPropVariant } from './isPropVariant';

export const getPropType = (name: string, prop: LocalPropResource): ts.TypeNode => {
    if (name === 'children') {
        return factory.createTypeReferenceNode(
            factory.createQualifiedName(
                factory.createIdentifier('JSX'),
                factory.createIdentifier('children'),
            ),
            undefined,
        );
    }
    const variant = isPropVariant(prop);
    if (variant) {
        factory.createTypeReferenceNode(factory.createIdentifier(variant.name), undefined);
    }
    return factory.createLiteralTypeNode(factory.createStringLiteral('string'));
};
