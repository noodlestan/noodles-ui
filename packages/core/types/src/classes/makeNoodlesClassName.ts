import { NUI_CLASSNAME_SEPARATOR, NUI_PREFIX } from './constants';

export const makeNoodlesClassName = (...className: string[]): string =>
    `${NUI_PREFIX}${NUI_CLASSNAME_SEPARATOR}${className.join(NUI_CLASSNAME_SEPARATOR)}`;
