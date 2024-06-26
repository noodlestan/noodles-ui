import { ThemeBuildContext, getThemeIdentifier } from '@noodles-ui/core-entities';
import ts from 'typescript';

const factory = ts.factory;

export const importTokens = (theme: ThemeBuildContext): ts.Statement => {
    const tokensRelativeFileName = `./${getThemeIdentifier(theme.entity)}.tokens`;
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('tokens'), undefined),
        factory.createStringLiteral(tokensRelativeFileName),
        undefined,
    );
};
