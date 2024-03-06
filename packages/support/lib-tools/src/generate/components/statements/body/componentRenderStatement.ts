import { ComponentGeneratedResource } from '@noodles-ui/core-types';
import ts, { JsxAttributeLike } from 'typescript';

import { factory } from '../exportComponent';
import { renderedComponentAlias } from '../util/renderedComponentAlias';

export const componentRenderStatement = (
    instance: ComponentGeneratedResource,
    props: JsxAttributeLike[],
): ts.Statement => {
    const alias = renderedComponentAlias(instance.render);
    return factory.createReturnStatement(
        factory.createJsxSelfClosingElement(
            factory.createIdentifier(alias),
            undefined,
            factory.createJsxAttributes([
                factory.createJsxSpreadAttribute(factory.createIdentifier('props')),
                ...props,
            ]),
        ),
    );
};
