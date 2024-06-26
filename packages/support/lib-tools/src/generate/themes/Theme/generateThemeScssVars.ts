import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { ThemeBuildContext, getThemeName } from '@noodles-ui/core-entities';
import {
    NUI_COLOUR_SCHEME_PREFIX,
    NUI_SURFACE_PREFIX,
    NUI_THEME_PREFIX,
    TokenMap,
    makeNoodlesClassName,
} from '@noodles-ui/core-types';

import { ensureFileDir } from '../../../util/ensureFileDir';
import { diffDateNow, getDateNow } from '../../../util/time';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { themeCssVarsFileName } from '../paths/themeCssVarsFileName';

const parseTokenValue = (value: string): string => {
    if (value.startsWith('{--')) {
        return value.replace('{--', 'var(--').replace(/}$/, ')');
    }
    return value;
};

const cssVarDeclaration = (key: string, value: string): string => {
    return `    ${key}: ${parseTokenValue(value)};`;
};

const classDeclaration = (classes: string[], tokens: TokenMap): string[] => {
    const classNames = '.' + classes.join('.');
    const cssVars = Object.entries(tokens).map(([key, value]) => cssVarDeclaration(key, value));

    return cssVars.length ? [classNames + ' {', ...cssVars, '}'] : [];
};

export const generateThemeScssVars = async (
    compiler: CompilerContext,
    targetDir: string,
    theme: ThemeBuildContext,
): Promise<void> => {
    const time = getDateNow();
    const fileName = themeCssVarsFileName(targetDir, theme);
    await ensureFileDir(fileName);

    const themeName = getThemeName(theme.entity);

    const baseGlobals = classDeclaration(
        [makeNoodlesClassName(NUI_THEME_PREFIX, themeName)],
        theme.entity.tokens.base.global,
    );
    const baseSurfaces = Object.entries(theme.entity.tokens.base.surfaces).flatMap(
        ([surfaceName, tokenMap]) => {
            return classDeclaration(
                [
                    makeNoodlesClassName(NUI_THEME_PREFIX, themeName),
                    makeNoodlesClassName(NUI_SURFACE_PREFIX, surfaceName),
                ],
                tokenMap,
            );
        },
    );
    const altGlobals = classDeclaration(
        [
            makeNoodlesClassName(NUI_COLOUR_SCHEME_PREFIX, 'light'),
            makeNoodlesClassName(NUI_THEME_PREFIX, themeName),
        ],
        theme.entity.tokens.alt.global,
    );
    const altSurfaces = Object.entries(theme.entity.tokens.alt.surfaces).flatMap(
        ([surfaceName, tokenMap]) => {
            return classDeclaration(
                [
                    makeNoodlesClassName(NUI_COLOUR_SCHEME_PREFIX, 'light'),
                    makeNoodlesClassName(NUI_THEME_PREFIX, themeName),
                    makeNoodlesClassName(NUI_SURFACE_PREFIX, surfaceName),
                ],
                tokenMap,
            );
        },
    );

    const content = [...baseGlobals, ...baseSurfaces, ...altGlobals, ...altSurfaces].join('\n');

    const output = tsFileHeader(compiler, fileName) + content + '\n';
    await writeFile(fileName, output);

    compiler.addGeneratedSourceFile({ fileName, success: true, time: diffDateNow(time) });
};
