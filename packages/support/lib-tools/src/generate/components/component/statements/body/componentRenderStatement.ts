import { ComponentOwnInstance } from '@noodles-ui/core-types';
import ts, { JsxAttributeLike } from 'typescript';

import { renderedComponentAlias } from '../util/renderedComponentAlias';

const factory = ts.factory;

export const componentRenderStatement = (
    instance: ComponentOwnInstance,
    jsxProps: JsxAttributeLike[],
): ts.Statement => {
    const alias = renderedComponentAlias(instance.render);

    return factory.createReturnStatement(
        factory.createJsxSelfClosingElement(
            factory.createIdentifier(alias),
            undefined,
            factory.createJsxAttributes([
                factory.createJsxSpreadAttribute(factory.createIdentifier('props')),
                ...jsxProps,
            ]),
        ),
    );
};
