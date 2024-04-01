import { ProjectEntities, SystemBuildContext } from '../project-entities';

export const getSystem = (context?: ProjectEntities): SystemBuildContext => {
    const value = Array.from(context?.entities.system.values() || [])[0];
    if (!value) {
        throw new Error('No system entity found');
    }
    return value;
};
