import { ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeComponentName } from '../../../../entities/theme/getters/getThemeComponentName';

const factory = ts.factory;

export const exportThemesStatement = (project: ProjectContext): ts.Statement => {
    const themes = Array.from(project.entities.theme.values());
    const themeNames = themes.map(theme => {
        const name = getThemeComponentName(theme.entity);
        return factory.createIdentifier(name);
    });
    return factory.createExportAssignment(
        undefined,
        undefined,
        factory.createArrayLiteralExpression(themeNames, false),
    );
};
