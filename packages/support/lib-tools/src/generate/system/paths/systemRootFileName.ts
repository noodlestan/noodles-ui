import { join } from 'path';

import { CompilerContext } from '@noodles-ui/core-compiler';
import { getSystemComponentName } from '@noodles-ui/core-entities';

export const systemRootFileName = (compiler: CompilerContext, target: string): string => {
    const componentName = getSystemComponentName(compiler);
    return join(target, `providers/${componentName}/${componentName}.tsx`);
};
