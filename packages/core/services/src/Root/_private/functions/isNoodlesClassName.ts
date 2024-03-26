import { NUI_PREFIX } from '@noodles-ui/core-types';

export const isNoodlesClassName = (className: string): boolean => className.startsWith(NUI_PREFIX);
