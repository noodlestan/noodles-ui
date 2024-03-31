import { join } from 'path';

import { CompilerContext } from '@noodles-ui/support-types';

import { systemComponentName } from '../RootComponent/systemComponentName';

export const systemRootModuleFileName = (compiler: CompilerContext, target: string): string => {
    const componentName = systemComponentName(compiler);
    return join(target, `/providers/${componentName}/${componentName}.module.scss`);
};
