import { ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { relativePath } from '../../../util/fs';
import { systemRootCssFileName } from '../paths/systemRootCssFileName';

const factory = ts.factory;

export const importRootCss = (
    project: ProjectContext,
    fileName: string,
    target: string,
): ts.Statement => {
    const rootCssFileName = systemRootCssFileName(project, target);
    const cssRelativeFileName = relativePath(fileName, rootCssFileName);
    return factory.createImportDeclaration(
        undefined,
        undefined,
        factory.createStringLiteral(cssRelativeFileName),
        undefined,
    );
};
