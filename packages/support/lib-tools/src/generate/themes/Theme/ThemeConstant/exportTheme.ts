import { ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeIdentifier } from '../../../../entities/theme/getters/getThemeIdentifier';
import { getThemeName } from '../../../../entities/theme/getters/getThemeName';

import { createPropertyAssignment } from './createPropertyAssignment';
import { createShorthandAssignment } from './createShorthandAssignment';

export const factory = ts.factory;

export const exportTheme = (theme: ThemeBuildContext): ts.Statement => {
    const { entity } = theme;
    const themeIdentifier = getThemeIdentifier(entity);

    const themeName = getThemeName(theme.entity);
    const extendedThemes = entity.extend.map(extended => {
        const extendedName = getThemeName(extended);
        return factory.createStringLiteral(extendedName);
    });

    const name = createPropertyAssignment('name', factory.createStringLiteral(themeName));
    const module = createPropertyAssignment('module', factory.createStringLiteral(entity.module));
    const extend = createPropertyAssignment(
        'extend',
        factory.createArrayLiteralExpression(extendedThemes, false),
    );
    const mode = createPropertyAssignment('mode', factory.createStringLiteral(entity.mode));
    const component = createShorthandAssignment('component');
    const tokens = createShorthandAssignment('tokens');

    const themeVar = factory.createVariableDeclaration(
        factory.createIdentifier(themeIdentifier),
        undefined,
        factory.createTypeReferenceNode(factory.createIdentifier('Theme'), undefined),
        factory.createObjectLiteralExpression(
            [name, module, extend, mode, component, tokens],
            true,
        ),
    );

    return factory.createVariableStatement(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList([themeVar], ts.NodeFlags.Const),
    );
};
