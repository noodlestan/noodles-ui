import { Params } from './params';

export type ExtendWithParams<T, P extends Params> = T | [T, P];
