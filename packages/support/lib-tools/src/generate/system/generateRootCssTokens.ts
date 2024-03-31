import { writeFile } from 'fs/promises';

import { CompilerContext, ThemeBuildContext } from '@noodles-ui/support-types';

import { getThemesInTopologicalOrder } from '../../entities/theme/getters/getThemesInTopologicalOrder';
import { ensuredFiledir, relativePath } from '../../util/fs';
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
