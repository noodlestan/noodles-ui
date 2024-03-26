import { ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getThemeIdentifier } from '../../../entities/theme/getters/getThemeIdentifier';

const factory = ts.factory;

export const exportThemesStatement = (project: ProjectContext): ts.Statement => {
    const themes = Array.from(project.entities.theme.values());
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
