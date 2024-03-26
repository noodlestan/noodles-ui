import { ProjectContext } from '@noodles-ui/support-types';

import { generateComponent } from './components/generateComponent';
import { generateComponentsList } from './components/generateComponentsList';
import { generateComponentsLiveMap } from './components/generateComponentsLiveMap';

export const generateComponents = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    const tasks = Array.from(project.entities.component.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.context.public)
        .map(([key, item]) => generateComponent(project, key, item, targetDir));

    tasks.push(generateComponentsList(project, targetDir));
    tasks.push(generateComponentsLiveMap(project, targetDir));

    await Promise.all(tasks);
};
