import { logMessage } from './logMessage';

export const logChildData = (prefix: string, data: string): void => {
    data.toString()
        .trim()
        .split('\n')
        .map((line: string) => logMessage(prefix, line));
};
