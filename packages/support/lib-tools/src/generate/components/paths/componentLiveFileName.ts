import { join } from 'path';

import { ComponentEntity } from '@noodles-ui/core-types';

export const componentLiveFileName = (target: string, entity: ComponentEntity): string => {
    const name = entity.name;
    return join(target, `components/${name}/${name}.demo.tsx`);
};
