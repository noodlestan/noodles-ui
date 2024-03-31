import { CompilerContext } from '@noodles-ui/support-types';

import { safeName } from '../../../util/string';

export const systemComponentName = (compiler: CompilerContext): string => {
    return safeName(compiler.entities.project.name || 'NUI') + 'Root';
};
