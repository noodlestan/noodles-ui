import { ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeIdentifier } from '../../../../entities/theme/getters/getThemeIdentifier';

const factory = ts.factory;

// import './HelloTheme.css';

export const importThemeCss = (theme: ThemeBuildContext): ts.Statement => {
    const cssRelativeFileName = `./${getThemeIdentifier(theme.entity)}.tokens.css`;
    return factory.createImportDeclaration(
        undefined,
        undefined,
        factory.createStringLiteral(cssRelativeFileName),
        undefined,
    );
};
