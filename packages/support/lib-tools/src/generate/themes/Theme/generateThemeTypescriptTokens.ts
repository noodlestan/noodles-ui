import { writeFile } from 'fs/promises';

import { ThemeModeTokens, TokenMap } from '@noodles-ui/core-types';
import { ProjectContext, ThemeBuildContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { ensuredFiledir } from '../../../util/fs';
import { formatTypescriptFile } from '../../eslint/formatTypescriptFile';
import { TypesToImport, createImportStatements } from '../../internal/createImportStatements';
import { formatSourceCodeWithPrettier } from '../../prettier/formatSourceCodeWithPrettier';
import { printTypescriptStatements } from '../../typescript/printTypescriptStatements';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { themeTypescriptTokensFileName } from '../paths/themeTypescriptTokensFileName';

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

function declareTokens(project: ProjectContext, theme: ThemeBuildContext): ts.Statement {
    const baseTokens = getThemeModeTokens(project, theme.entity.tokens.base);
    const altTokens = getThemeModeTokens(project, theme.entity.tokens.alt);

    const base = factory.createPropertyAssignment(
        factory.createIdentifier('base'),
        factory.createObjectLiteralExpression(baseTokens, true),
    );
    const alt = factory.createPropertyAssignment(
        factory.createIdentifier('alt'),
        factory.createObjectLiteralExpression(altTokens, false),
    );

    return factory.createVariableStatement(
        undefined,
        factory.createVariableDeclarationList(
            [
                factory.createVariableDeclaration(
                    factory.createIdentifier('tokens'),
                    undefined,
                    factory.createTypeReferenceNode(
                        factory.createIdentifier('ThemeTokens'),
                        undefined,
                    ),
                    factory.createObjectLiteralExpression([base, alt], true),
                ),
            ],
            ts.NodeFlags.Const,
        ),
    );
}

export const generateThemeTypescriptTokens = async (
    project: ProjectContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    const fileName = themeTypescriptTokensFileName(targetDir, theme);
    await ensuredFiledir(fileName);

    const internalTypes: TypesToImport = [['@noodles-ui/core-types', ['ThemeTokens']]];
    const internalImports = createImportStatements(internalTypes);
    const tokensDeclaration = declareTokens(project, theme);
    const exportDefault = factory.createExportAssignment(
        undefined,
        undefined,
        factory.createIdentifier('tokens'),
    );

    const statements = [...internalImports, tokensDeclaration, exportDefault];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};
