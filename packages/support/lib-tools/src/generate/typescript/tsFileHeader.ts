import { ProjectContext } from '@noodles-ui/support-types';

import { formatFileName } from '../../cli/format/formatFileName';

export const tsFileHeader = (project: ProjectContext, fileName: string): string => {
    return (
        [
            '/**',
            ' * noodles-ui / auto-generated',
            ' *',
            ` * ${project.build.timestamp.toISOString()}`,
            ` * ${formatFileName(project, fileName)}`,
            ` */`,
        ].join('\n') + '\n\n'
    );
};
