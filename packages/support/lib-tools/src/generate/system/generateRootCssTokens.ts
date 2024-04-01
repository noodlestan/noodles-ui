import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { ThemeBuildContext, getThemesInTopologicalOrder } from '@noodles-ui/core-entities';

import { ensuredFiledir } from '../../util/ensuredFiledir';
import { relativePath } from '../../util/relativePath';
import { diffDateNow, getDateNow } from '../../util/time';
import { themeCssVarsFileName } from '../themes/paths/themeCssVarsFileName';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { systemRootTokensFileName } from './paths/systemRootTokensFileName';

export const generateRootCssTokens = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = systemRootTokensFileName(compiler, targetDir);
    await ensuredFiledir(fileName);

    const themes = getThemesInTopologicalOrder(compiler);

    const themeImportStatement = (theme: ThemeBuildContext, targetDir: string) => {
        const themeFile = themeCssVarsFileName(targetDir, theme);
        return `@import '${relativePath(fileName, themeFile)}';`;
    };

    const lines = themes.map(theme => themeImportStatement(theme, targetDir));
    const content = [...lines].join('\n');

    const output = tsFileHeader(compiler, fileName) + content + '\n';
    await writeFile(fileName, output);

    compiler.addGeneratedSourceFile({ fileName, success: true, time: diffDateNow(time) });
};
