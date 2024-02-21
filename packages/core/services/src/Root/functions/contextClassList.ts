import { classListFromClassNames } from '../_private/functions/classListFromClassNames';
import { ClassList } from '../_private/functions/types';

import { contextClassNames } from './contextClassNames';

export const contextClassList = (): ClassList => {
    return classListFromClassNames(contextClassNames());
};
