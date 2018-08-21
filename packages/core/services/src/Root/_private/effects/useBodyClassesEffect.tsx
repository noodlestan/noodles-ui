import { createEffect } from 'solid-js';

import { NOODLES_PREFIX } from '../../constants';
import { colourSchemeClassNames } from '../functions/colourSchemeClassNames';
import { isNoodlesClassName } from '../functions/isNoodlesClassName';
import { surfaceClassNames } from '../functions/surfaceClassNames';
import { themeClassNames } from '../functions/themeClassNames';

export const useBodyClassesEffect = (): void => {
    const updateClassList = () => {
        const classNames = [
            NOODLES_PREFIX,
            ...colourSchemeClassNames(),
            ...themeClassNames(),
            ...surfaceClassNames(),
        ];
        const currentClasses = Array(...document.body.classList);
        const toRemove = currentClasses.filter(isNoodlesClassName);
        document.body.classList.remove(...toRemove);
        document.body.classList.add(...classNames);
    };

    createEffect(updateClassList);
};
