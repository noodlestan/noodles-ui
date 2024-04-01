import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { getProject } from '@noodles-ui/core-entities';

import { ensuredFiledir } from '../../util/ensuredFiledir';
import { diffDateNow, getDateNow } from '../../util/time';
import { createMixinImportStatement } from '../mixins/createMixinImportStatement';
import { createMixinStatement } from '../mixins/createMixinStatement';
import { indent } from '../text/indent';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { systemRootModuleFileName } from './paths/systemRootModuleFileName';

const mixinImplementationStatements = (compiler: CompilerContext): string[] => {
    const { use } = getProject(compiler).entity;
    return [...(use || [])].map(mixin => createMixinStatement(compiler, mixin));
};

const mixinImportStatements = (compiler: CompilerContext): string[] => {
    const { use } = getProject(compiler).entity;
    return [...(use || [])].map(mixin => createMixinImportStatement(compiler, mixin));
};

export const generateRootScssModule = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = systemRootModuleFileName(compiler, targetDir);
    await ensuredFiledir(fileName);

    const content = [
        ...mixinImportStatements(compiler),
        '',
        `.Root {`,
        ...indent(mixinImplementationStatements(compiler)),
        `}`,
    ];
    const output = tsFileHeader(compiler, fileName) + content.join('\n') + '\n';
    await writeFile(fileName, output);

    compiler.addGeneratedSourceFile({ fileName, success: true, time: diffDateNow(time) });
};
