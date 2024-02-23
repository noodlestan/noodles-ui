import { ProjectContext } from '../types/projects';

import { logMessage } from './logMessage';

export const logProjectBasicInfo = (project: ProjectContext): void => {
    logMessage(`project: `, project.projectFile);
    logMessage(`path: `, project.projectPath);
    logMessage(`root: `, project.rootPath);
    console.info('');
};
