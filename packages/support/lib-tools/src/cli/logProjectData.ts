// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { bold, green } from 'kleur';

import { ProjectContext } from '../types/projects';

import { logMessage } from './logMessage';

export const logProjectData = (project: ProjectContext): void => {
    const { surfaces, themes, variants, components, tokens } = project;

    logMessage(green().bold('surfaces'), surfaces.items);
    logMessage(green().bold('themes'), themes.items);
    logMessage(green().bold('variants'), variants.items);
    logMessage(green().bold('components'), components.items);
    logMessage(green().bold('tokens'), tokens.items);
};
