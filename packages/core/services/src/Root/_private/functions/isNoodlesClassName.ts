import { NOODLES_PREFIX } from '../../constants';

export const isNoodlesClassName = (className: string): boolean =>
    className.startsWith(NOODLES_PREFIX);
