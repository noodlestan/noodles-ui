import { formatFileName } from '../../cli/format/formatFileName';
import { ProjectContext } from '../../types/projects';

export const tsFileHeader = (project: ProjectContext, fileName: string): string => {
    return (
        [
            '/**',
            ' * noodles-ui / auto-generated',
            ' *',
            ` * ${project.build.timestamp.toISOString()}`,
            ` * ${formatFileName(project.build.modules, fileName)}`,
            ` */`,
        ].join('\n') + '\n\n'
    );
};
