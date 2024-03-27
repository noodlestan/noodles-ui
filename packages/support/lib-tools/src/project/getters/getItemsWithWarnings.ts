import { ProjectContext } from '@noodles-ui/support-types';

import { getDiagnosticKey } from '../../cli/log/getDiagnosticKey';

import { getProjectWarnings } from './getProjectWarnings';

type ItemsWithWarnings = {
    [key: string]: number;
};

export const getItemsWithWarnings = (project: ProjectContext): ItemsWithWarnings => {
    return getProjectWarnings(project).reduce((acc, item) => {
        const sourceKey = getDiagnosticKey(project, item.source);
        acc[sourceKey] = acc[sourceKey] || 0;
        acc[sourceKey]++;
        return acc;
    }, {} as ItemsWithWarnings);
};
