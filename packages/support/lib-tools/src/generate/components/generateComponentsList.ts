import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { ComponentBuildContext } from '@noodles-ui/core-entities';

import { ensuredFiledir, relativePath } from '../../util/fs';
import { diffDateNow, getDateNow } from '../../util/time';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { componentFileName } from './paths/componentFileName';
import { componentIndexFileName } from './paths/componentIndexFileName';

const generateComponentLine = (
    compiler: CompilerContext,
    key: string,
    component: ComponentBuildContext,
    fileName: string,
    targetDir: string,
): string => {
    const { entity } = component;
    const name = entity.name;
    const generatedPath = componentFileName(targetDir, entity);

    const path = relativePath(fileName, generatedPath, true);
    return `export { ${name}, ${name}Props } from '${path}';`;
};

export const generateComponentsList = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = componentIndexFileName(targetDir);
    await ensuredFiledir(fileName);

    const lines = Array.from(compiler.entities.component.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.context.public)
        .map(([key, item]) => {
            return generateComponentLine(compiler, key, item, fileName, targetDir);
        });
    const content = [...lines].join('\n');

    const output = tsFileHeader(compiler, fileName) + content + '\n';
    await writeFile(fileName, output);
    const success = await formatTypescriptFile(compiler, fileName);

    compiler.addGeneratedSourceFile({ fileName, success, time: diffDateNow(time) });
};
