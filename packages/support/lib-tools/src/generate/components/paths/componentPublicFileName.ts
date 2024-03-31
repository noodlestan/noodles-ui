import { join } from 'path';

import { ComponentEntity } from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

export const componentPublicFileName = (
    compiler: CompilerContext,
    entity: ComponentEntity,
): string => {
    const name = entity.name;
    // TODO BuildOptions getComponentPath(entity) => string
    return join(compiler.projectPath, `src/components/${name}/${name}.tsx`);
};
