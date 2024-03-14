import { ComponentContextWithInstance, ProjectContext } from '@noodles-ui/support-types';

import { generateComponent } from './components/component/generateComponent';

export const generateComponents = async (project: ProjectContext): Promise<void> => {
    const promises = Array.from(project.components.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.public)
        .map(([key, item]) => {
            if (!item.instance) {
                throw new Error('Missing instance');
            }
            return generateComponent(project, key, item as ComponentContextWithInstance);
        });
    await Promise.all(promises);
};
