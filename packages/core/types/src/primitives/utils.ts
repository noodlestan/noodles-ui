import { ExtendParams } from './params';

export type ExtendWithParams<T, P extends ExtendParams> = T | [T, P];
