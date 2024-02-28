import { Resource } from './resource';

export type SurfaceResource = Resource<'surface'> & {
    extend: string[];
};
