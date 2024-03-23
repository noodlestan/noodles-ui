import { ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeIdentifier } from '../../../../entities/theme/getters/getThemeIdentifier';

import { createPropertyAssignment } from './createPropertyAssignment';
import { createShorthandAssignment } from './createShorthandAssignment';

export const factory = ts.factory;

// export const HelloTheme: Theme = {
//     name: 'Hello',
//     module: '@noodles-ui/lab-ui',
//     extend: [],
//     mode: 'dark',
//     component,
//     tokens,
// };

export const exportTheme = (theme: ThemeBuildContext): ts.Statement => {
    const { entity } = theme;
    const themeName = getThemeIdentifier(entity);

    const extendedThemes = [] as ts.Expression[];

    const name = createPropertyAssignment('name', factory.createStringLiteral(entity.name));
    const module = createPropertyAssignment('module', factory.createStringLiteral(entity.module));
    const extend = createPropertyAssignment(
        'extend',
        factory.createArrayLiteralExpression(extendedThemes, false),
    );
    const mode = createPropertyAssignment('mode', factory.createStringLiteral(entity.mode));
    const component = createShorthandAssignment('component');
    const tokens = createShorthandAssignment('tokens');

    const themeVar = factory.createVariableDeclaration(
        factory.createIdentifier(themeName),
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
