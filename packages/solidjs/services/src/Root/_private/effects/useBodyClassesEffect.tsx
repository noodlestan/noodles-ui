import { createEffect } from 'solid-js';

import { contextClassNames } from '../../functions/contextClassNames';
import { isNoodlesClassName } from '../functions/isNoodlesClassName';

export const useBodyClassesEffect = (classList?: () => { [key: string]: boolean }): void => {
    const updateClassList = () => {
        const classNames = contextClassNames();
        const currentClasses = Array.from(document.body.classList);
        // const currentClasses = Array(...document.body.classList); TODO print Typescript errors in compileFromProjectFile()
        const toRemove = currentClasses.filter(isNoodlesClassName);
        document.body.classList.remove(...toRemove);
        document.body.classList.add(...classNames);
        const cl = classList ? classList() : {};
        document.body.classList.add(...Object.keys(cl));
    };

    createEffect(updateClassList);
};
