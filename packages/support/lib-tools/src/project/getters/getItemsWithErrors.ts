import { ProjectContext } from '@noodles-ui/support-types';

import { getDiagnosticKey } from '../../cli/log/getDiagnosticKey';

import { getProjectErrors } from './getProjectErrors';

type ItemsWithErrors = {
    [key: string]: number;
};

export const getItemsWithErrors = (project: ProjectContext): ItemsWithErrors => {
    return getProjectErrors(project).reduce((acc, item) => {
        const sourceKey = getDiagnosticKey(project, item.source);
        acc[sourceKey] = acc[sourceKey] || 0;
        acc[sourceKey]++;
        return acc;
    }, {} as ItemsWithErrors);
};
