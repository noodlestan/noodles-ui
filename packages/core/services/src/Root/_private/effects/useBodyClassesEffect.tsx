import { createEffect } from 'solid-js';

import { contextClassNames } from '../../functions/contextClassNames';
import { isNoodlesClassName } from '../functions/isNoodlesClassName';

export const useBodyClassesEffect = (classList?: () => { [key: string]: boolean }): void => {
    const updateClassList = () => {
        const classNames = contextClassNames();
        const currentClasses = Array(...document.body.classList);
        const toRemove = currentClasses.filter(isNoodlesClassName);
        document.body.classList.remove(...toRemove);
        document.body.classList.add(...classNames);
        const cl = classList ? classList() : {};
        document.body.classList.add(...Object.keys(cl));
    };

    createEffect(updateClassList);
};
