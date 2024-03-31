import { CompilerContext } from '@noodles-ui/core-compiler';
import { getThemeIdentifier } from '@noodles-ui/core-entities';
import ts from 'typescript';

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
