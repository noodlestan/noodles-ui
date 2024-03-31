import { CompilerContext } from '@noodles-ui/support-types';

import { getProject } from '../../../entities/project/getProject';
import { safeName } from '../../../util/string';

export const systemComponentName = (compiler: CompilerContext): string => {
    return safeName(getProject(compiler).entity.name || 'NUI') + 'Root';
};
