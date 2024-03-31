import { Resource } from '../types';

export type SurfaceResource = Resource<'surface'> & {
    extend: string[];
};
