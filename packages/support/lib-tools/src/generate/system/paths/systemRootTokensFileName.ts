import { join } from 'path';

import { CompilerContext } from '@noodles-ui/core-compiler';

import { systemComponentName } from '../RootComponent/systemComponentName';

export const systemRootTokensFileName = (compiler: CompilerContext, target: string): string => {
    const componentName = systemComponentName(compiler);
    return join(target, `/providers/${componentName}/${componentName}.tokens.css`);
};
