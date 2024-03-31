import { ComponentOwnEntity } from '@noodles-ui/core-entities';
import ts, { JsxAttributeLike } from 'typescript';

import { renderedComponentAlias } from '../util/renderedComponentAlias';

const factory = ts.factory;

export const componentRenderStatement = (
    entity: ComponentOwnEntity,
    jsxProps: JsxAttributeLike[],
): ts.Statement => {
    const alias = renderedComponentAlias(entity.render);

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
