import { join } from 'path';

import { ComponentEntity } from '@noodles-ui/core-entities';

export const componentFileName = (target: string, entity: ComponentEntity): string => {
    const name = entity.name;
    return join(target, `components/${name}/${name}.tsx`);
};
