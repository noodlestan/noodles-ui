import { CompilerContext } from '@noodles-ui/core-compiler';
import { getProject } from '@noodles-ui/core-entities';

import { safeName } from '../../../util/string';

export const systemComponentName = (compiler: CompilerContext): string => {
    return safeName(getProject(compiler).entity.name || 'NUI') + 'Root';
};
