import { ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeIdentifier } from '../../../../entities/theme/getters/getThemeIdentifier';

const factory = ts.factory;

export const importTokens = (theme: ThemeBuildContext): ts.Statement => {
    const tokensRelativeFileName = `./${getThemeIdentifier(theme.entity)}.tokens.ts`;
    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, factory.createIdentifier('tokens'), undefined),
        factory.createStringLiteral(tokensRelativeFileName),
        undefined,
    );
};
