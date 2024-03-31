import { CompilerContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeIdentifier } from '../../../entities/theme/getters/getThemeIdentifier';

const factory = ts.factory;

export const exportThemesStatement = (compiler: CompilerContext): ts.Statement => {
    const themes = Array.from(compiler.entities.theme.values());
    const themeNames = themes.map(theme => {
        const themeIdentifier = getThemeIdentifier(theme.entity);
        return factory.createIdentifier(themeIdentifier);
    });
    return factory.createExportAssignment(
        undefined,
        undefined,
        factory.createArrayLiteralExpression(themeNames, false),
    );
};
