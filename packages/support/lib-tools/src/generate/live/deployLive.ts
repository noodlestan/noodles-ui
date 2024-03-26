import { readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';

import { ProjectContext } from '@noodles-ui/support-types';

import { locateDependencyDir } from '../../monorepo/locateDependencyDir';
import { copyFiles } from '../../util/copyFiles';
import { NUI_LIVE_DIR } from '../constants';
import { systemComponentName } from '../system/RootComponent/systemComponentName';
import { tsFileHeader } from '../typescript/tsFileHeader';

const copyUIRootFile = async (
    project: ProjectContext,
    source: string,
    target: string,
): Promise<string> => {
    const sourceFile = join(source, 'src/UIRoot.tsx');
    const destinationFile = join(target, 'src/UIRoot.tsx');

    const componentName = systemComponentName(project);
    const contents = (await readFile(sourceFile)).toString();
    const output =
        tsFileHeader(project, destinationFile) + contents.replace(/UIRoot_/g, componentName);
    await writeFile(destinationFile, output);

    return destinationFile;
};

const fileFilter = (file: string) => !file.startsWith('_') && !file.endsWith('_');

export const deployLive = async (project: ProjectContext): Promise<string> => {
    const sketleton = locateDependencyDir('@noodles-ui/live-solidjs');
    const live = join(project.projectPath, NUI_LIVE_DIR);
    await rm(live, { recursive: true, force: true });
    await copyFiles(sketleton, live, { fileFilter });
    await copyUIRootFile(project, sketleton, live);
    return join(live, 'src/');
};
