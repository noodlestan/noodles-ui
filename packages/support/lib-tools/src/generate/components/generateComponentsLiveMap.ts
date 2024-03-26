import { writeFile } from 'fs/promises';

import { ProjectContext } from '@noodles-ui/support-types';
import ts from 'typescript';

import { getPublicComponents } from '../../entities/component/getters/getPublicComponents';
import { ensuredFiledir } from '../../util/fs';
import { formatTypescriptFile } from '../eslint/formatTypescriptFile';
import { formatSourceCodeWithPrettier } from '../prettier/formatSourceCodeWithPrettier';
import { importFrameworkTypes } from '../targets/solid-js/importFrameworkTypes';
import { printTypescriptStatements } from '../typescript/printTypescriptStatements';
import { tsFileHeader } from '../typescript/tsFileHeader';

import { declareLiveMap } from './ComponentsLiveMap/declareLiveMap';
import { importComponent } from './ComponentsLiveMap/importComponent';
import { componentsLiveMapFileName } from './paths/componentsLiveMapFileName';

const factory = ts.factory;

export const generateComponentsLiveMap = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const fileName = componentsLiveMapFileName(targetDir);
    await ensuredFiledir(fileName);

    const components = getPublicComponents(project);
    const importComponents = components.map(component => importComponent(component, targetDir));

    const exportDefault = factory.createExportAssignment(
        undefined,
        undefined,
        factory.createIdentifier('liveMap'),
    );

    const statements = [
        importFrameworkTypes(),
        ...importComponents,
        declareLiveMap(project),
        exportDefault,
    ];

    const content = await printTypescriptStatements(statements);
    const output = tsFileHeader(project, fileName) + content + '\n';
    const formatted = await formatSourceCodeWithPrettier(fileName, output);
    await writeFile(fileName, formatted);
    const success = await formatTypescriptFile(project, fileName);

    project.addGeneratedSourceFile({ fileName, success });
};
