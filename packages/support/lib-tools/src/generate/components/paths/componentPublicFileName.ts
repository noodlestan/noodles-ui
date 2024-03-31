import { join } from 'path';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { ComponentEntity } from '@noodles-ui/core-entities';

export const componentPublicFileName = (
    compiler: CompilerContext,
    entity: ComponentEntity,
): string => {
    const name = entity.name;
    // TODO BuildOptions getComponentPath(entity) => string
    return join(compiler.projectPath, `src/components/${name}/${name}.tsx`);
};
