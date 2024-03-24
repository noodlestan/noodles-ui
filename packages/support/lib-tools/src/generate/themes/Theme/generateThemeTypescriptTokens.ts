import { writeFile } from 'fs/promises';

import { ThemeModeTokens, TokenMap } from '@noodles-ui/core-types';
import { ProjectContext, ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { ensuredFiledir } from '../../../util/fs';
import { formatTypescriptFile } from '../../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../../typescript/printTypescriptStatements';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { themeComponentFileName } from '../paths/themeComponentFileName';

const factory = ts.factory;

const createToken = (key: string, value: string): ts.PropertyAssignment =>
    factory.createPropertyAssignment(
        factory.createStringLiteral(key),
        factory.createStringLiteral(value),
    );

function modeGlobalTokens(modeTokens: ThemeModeTokens): ts.PropertyAssignment {
    const globalTokens = Object.entries(modeTokens.global).map(([key, value]) => {
        return createToken(key, value);
    });
    return factory.createPropertyAssignment(
        factory.createIdentifier('global'),
        factory.createObjectLiteralExpression(globalTokens, true),
    );
}

function createThemeSurfaceTokens(tokenMap: TokenMap): ts.PropertyAssignment[] {
    return Object.entries(tokenMap).map(([key, value]) => createToken(key, value));
}

function modeSurfaceTokens(
    project: ProjectContext,
    modeTokens: ThemeModeTokens,
): ts.PropertyAssignment {
    const surfaces = Array.from(project.entities.surface.values());
    const surfaceMaps = surfaces.map(surface =>
        factory.createPropertyAssignment(
            factory.createIdentifier(surface.entity.name),
            factory.createObjectLiteralExpression(
                createThemeSurfaceTokens(modeTokens.surfaces[surface.entity.name]),
                true,
            ),
        ),
    );

    const surfaceTokens = factory.createPropertyAssignment(
        factory.createIdentifier('surfaces'),
        factory.createObjectLiteralExpression(surfaceMaps, true),
    );
    return surfaceTokens;
}

function getThemeModeTokens(
    project: ProjectContext,
    modeTokens: ThemeModeTokens,
): ts.PropertyAssignment[] {
    const globaltokens = modeGlobalTokens(modeTokens);
    const surfaceTokens = modeSurfaceTokens(project, modeTokens);

    return [globaltokens, surfaceTokens];
}

function exportTokens(project: ProjectContext, theme: ThemeBuildContext): ts.ExportAssignment {
    const baseTokens = getThemeModeTokens(project, theme.entity.tokens.base);
    const alternateTokens = getThemeModeTokens(project, theme.entity.tokens.alternate);

    const alternateName = 'light';

    const base = factory.createPropertyAssignment(
        factory.createIdentifier('base'),
        factory.createObjectLiteralExpression(baseTokens, true),
    );
    const alternate = factory.createPropertyAssignment(
        factory.createIdentifier(alternateName),
        factory.createObjectLiteralExpression(alternateTokens, false),
    );

    return factory.createExportAssignment(
        undefined,
        undefined,
        factory.createObjectLiteralExpression([base, alternate], true),
    );
}

export const generateThemeTypescriptTokens = async (
    project: ProjectContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    const fileName = themeComponentFileName(targetDir, theme);
    await ensuredFiledir(fileName);

    const statements = [exportTokens(project, theme)];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};
