import { ProjectContext } from '@noodles-ui/support-types';
import { gray } from 'kleur';

export const hintExpandPattern = (project: ProjectContext, pattern: string): string => {
    if (!project.interactive.hints || project.interactive.expand.includes(pattern)) {
        return '';
    }
    return gray().italic(`--expand ${pattern}`);
};
