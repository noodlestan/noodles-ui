import { NOODLES_CLASSNAME_SEPARATOR, NOODLES_PREFIX } from '../../constants';

export const makeNoodlesClassName = (...className: string[]): string =>
    `${NOODLES_PREFIX}${NOODLES_CLASSNAME_SEPARATOR}${className.join(NOODLES_CLASSNAME_SEPARATOR)}`;
