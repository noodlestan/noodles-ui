import { CompilerContext } from '@noodles-ui/support-types';

import { generateComponent } from './components/generateComponent';
import { generateComponentsList } from './components/generateComponentsList';
import { generateComponentsLiveMap } from './components/generateComponentsLiveMap';

export const generateComponents = async (
    compiler: CompilerContext,
    targetDir: string,
): Promise<void> => {
    const tasks = Array.from(compiler.entities.component.entries())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, item]) => item.context.public)
        .map(([key, item]) => generateComponent(compiler, key, item, targetDir));

    tasks.push(generateComponentsList(compiler, targetDir));
    tasks.push(generateComponentsLiveMap(compiler, targetDir));

    await Promise.all(tasks);
};
