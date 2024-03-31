import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';

import { ensuredFiledir } from '../../util/fs';
import { diffDateNow, getDateNow } from '../../util/time';
import { createMixinImportStatement } from '../mixins/createMixinImportStatement';
import { createMixinStatement } from '../mixins/createMixinStatement';
import { indent } from '../text/indent';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { systemRootModuleFileName } from './paths/systemRootModuleFileName';

const mixinImplementationStatements = (project: ProjectContext): string[] => {
    const { use } = project.entities.project || {};
    return [...(use || [])].map(mixin => createMixinStatement(project, mixin));
};

const mixinImportStatements = (project: ProjectContext): string[] => {
    const { use } = project.entities.project || {};
    return [...(use || [])].map(mixin => createMixinImportStatement(project, mixin));
};

export const generateRootScssModule = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = systemRootModuleFileName(project, targetDir);
    await ensuredFiledir(fileName);

    const content = [
        ...mixinImportStatements(project),
        '',
        `.Root {`,
        ...indent(mixinImplementationStatements(project)),
        `}`,
    ];
    const output = tsFileHeader(project, fileName) + content.join('\n') + '\n';
    await writeFile(fileName, output);

    project.addGeneratedSourceFile({ fileName, success: true, time: diffDateNow(time) });
};
