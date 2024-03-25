import { NUI_PREFIX } from '@noodles-ui/core-types/src/classes/constants';

export const isNoodlesClassName = (className: string): boolean => className.startsWith(NUI_PREFIX);
