import { CompilerContext, ComponentBuildContext } from '@noodles-ui/support-types';

import { generateComponentLive } from './Components/generateComponentLive';
import { generateComponentPrivate } from './Components/generateComponentPrivate';
// import { generateComponentPublic } from './Components/generateComponentPublic';
import { generateComponentScssModule } from './Components/generateComponentScssModule';

export const generateComponent = async (
    compiler: CompilerContext,
    key: string,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const tasks = [
        // generateComponentPublic(project, component, targetDir),
        generateComponentPrivate(compiler, component, targetDir),
        generateComponentLive(compiler, component, targetDir),
        generateComponentScssModule(compiler, component, targetDir),
    ];

    await Promise.all(tasks);
};
