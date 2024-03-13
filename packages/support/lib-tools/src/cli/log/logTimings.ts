// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gray, green, red, yellow } from 'kleur';

import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

export const logTimings = (timings: Array<[number, string]>): void => {
    if (timings.length > 1) {
        logInfo(yellow('Build timings:'));
        timings.forEach(([ts, name], index) => {
            if (!index) {
                return;
            }
            const previous = timings[index - 1];
            const [previousTs] = previous;
            logMessage('- ' + gray(name), ts - previousTs);
        });
        console.info('');
    }
};
