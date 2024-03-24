import { join } from 'path';

import { ComponentEntity } from '@noodles-ui/core-types';

import { componentScssModuleBaseName } from './componentScssModuleBaseName';

export const componentScssModuleFileName = (target: string, entity: ComponentEntity): string => {
    const name = entity.name;
    const baseName = componentScssModuleBaseName(entity);
    return join(target, 'components', name, baseName);
};
