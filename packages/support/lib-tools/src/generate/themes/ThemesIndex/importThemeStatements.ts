import { ProjectContext, ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeIdentifier } from '../../../entities/theme/getters/getThemeIdentifier';

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

export const importThemeStatements = (project: ProjectContext): ts.Statement[] => {
    const themes = Array.from(project.entities.theme.values());

    return themes.map(theme => importThemeStatement(theme));
};
