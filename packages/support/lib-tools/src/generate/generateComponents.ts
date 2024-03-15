import { ProjectContext } from '@noodles-ui/support-types';

import { generateComponent } from './components/component/generateComponent';

export const generateComponents = async (project: ProjectContext): Promise<void> => {
    const promises = Array.from(project.entities.component.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.context.public)
        .map(([key, item]) => generateComponent(project, key, item));
    await Promise.all(promises);
};
