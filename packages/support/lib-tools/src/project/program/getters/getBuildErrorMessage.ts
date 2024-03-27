import { BuildContext } from '@noodles-ui/support-types';

import { getBuildFilesWithErrors } from './getBuildFilesWithErrors';

export const getBuildErrorMessage = (build: BuildContext): string => {
    const { diagnostics = [] } = build;

    const uniqueFiles = getBuildFilesWithErrors(build);

    return `TS build errors (${diagnostics.length} errors in ${uniqueFiles.length} files)`;
};
