import { ProjectContext, ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeComponentName } from '../../../../entities/theme/getters/getThemeComponentName';

const factory = ts.factory;

const importThemeStatement = (theme: ThemeBuildContext): ts.Statement => {
    const { entity } = theme;

    const themeComponentName = getThemeComponentName(entity);
    const themePath = `./${themeComponentName}/${themeComponentName}`;

    return factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
            false,
            undefined,
            factory.createNamedImports([
                factory.createImportSpecifier(
                    false,
                    undefined,
                    factory.createIdentifier(themeComponentName),
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
