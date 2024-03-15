// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gray, green, red, yellow } from 'kleur';

import { formatMilieconds } from '../../util/string';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

export const logTimings = (timings: Array<[number, string]>): void => {
    if (timings.length > 1) {
        const last = timings[timings.length - 1][0];
        const first = timings[0][0];
        const totalTime = last - first;
        logInfo(yellow('Build timings'));
        logMessage('  ' + gray('Total:'), formatMilieconds(totalTime));
        timings.forEach(([ts, name], index) => {
            if (!index) {
                return;
            }
            const previous = timings[index - 1];
            const [previousTs] = previous;
            logMessage('  - ' + gray(name), formatMilieconds(ts - previousTs));
        });
        console.info('');
    }
};
