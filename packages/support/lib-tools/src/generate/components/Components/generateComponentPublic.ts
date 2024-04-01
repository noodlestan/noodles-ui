import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { ComponentBuildContext } from '@noodles-ui/core-entities';

import { ensureFileDir } from '../../../util/ensureFileDir';
import { relativePath } from '../../../util/relativePath';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentFileName } from '../paths/componentFileName';
import { componentPublicFileName } from '../paths/componentPublicFileName';

export const generateComponentPublic = async (
    compiler: CompilerContext,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const fileName = componentPublicFileName(compiler, component.entity);
    await ensureFileDir(fileName);

    const { entity } = component;
    const name = entity.name;
    const generatedPath = componentFileName(targetDir, component.entity);

    const path = relativePath(fileName, generatedPath, true);
    const content = `export { ${name}, ${name}Props } from '${path}';`;

    const output = tsFileHeader(compiler, fileName) + content + '\n';
    if (!existsSync(fileName)) {
        await writeFile(fileName, output);
        compiler.addGeneratedSourceFile({ fileName, success: true });
    } else {
        compiler.addGeneratedSourceFile({ fileName, skipped: true });
    }
};
