import { ClassList } from './types';

export const classListFromClassNames = (classNames: (string | undefined)[]): ClassList =>
    classNames.reduce(
        (acc, item) => {
            if (item) {
                acc[item] = true;
            }
            return acc;
        },
        {} as { [key: string]: boolean },
    );
