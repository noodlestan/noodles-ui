import { ProjectContext } from '@noodles-ui/support-types';

import { generateComponent } from './components/generateComponent';
import { generateComponentsList } from './components/generateComponentsList';

export const generateComponents = async (
    project: ProjectContext,
    targetDir: string,
): Promise<void> => {
    await generateComponentsList(project, targetDir);

    const promises = Array.from(project.entities.component.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.context.public)
        .map(([key, item]) => generateComponent(project, key, item, targetDir));
    await Promise.all(promises);
};
