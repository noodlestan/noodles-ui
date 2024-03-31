import { CompilerContext } from '@noodles-ui/core-compiler';
import { ThemeBuildContext, getThemeIdentifier } from '@noodles-ui/core-entities';
import ts from 'typescript';

const factory = ts.factory;

const importThemeStatement = (theme: ThemeBuildContext): ts.Statement => {
    const { entity } = theme;

    const themeIdentifier = getThemeIdentifier(entity);
    const themePath = `./${themeIdentifier}/${themeIdentifier}`;

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
            false,
            undefined,
            factory.createNamedImports([
                factory.createImportSpecifier(
                    false,
                    undefined,
                    factory.createIdentifier(themeIdentifier),
                ),
            ]),
        ),
        factory.createStringLiteral(themePath),
        undefined,
    );
};

export const importThemeStatements = (compiler: CompilerContext): ts.Statement[] => {
    const themes = Array.from(compiler.entities.theme.values());

    return themes.map(theme => importThemeStatement(theme));
};
