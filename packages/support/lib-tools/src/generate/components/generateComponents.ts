import { ProjectContext } from '../../types/projects';

import { generateComponent } from './generateComponent';

export const generateComponents = async (project: ProjectContext): Promise<void> => {
    const promises = Array.from(project.components.items.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.public)
        .map(([key, item]) => {
            if (!item.instance) {
                throw new Error('Missing instance');
            }
            return generateComponent(project, key, item, item.instance);
        });
    await Promise.all(promises);
};
