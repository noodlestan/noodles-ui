// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gray, green, red, yellow } from 'kleur';

import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

export const logTimings = (timings: Array<[number, string]>): void => {
    const first = timings.shift();
    if (first && timings.length) {
        const [firstTs] = first;
        logInfo('Build timings:');
        timings.forEach(([ts, name]) => logMessage('- ' + gray(name), ts - firstTs));
        console.info('');
    }
};
