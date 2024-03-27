import { yellow } from 'kleur';

import { logMessage } from '../logger/logMessage';

export const logChildData = (prefix: string, data: string): void => {
    data.toString()
        .split('\n')
        .map((line: string) => logMessage(yellow().bold(prefix), line));
};
