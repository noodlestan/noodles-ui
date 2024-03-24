import { ProjectContext } from '@noodles-ui/support-types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gray, green, red, yellow } from 'kleur';

import { formatMilieconds } from '../../util/string';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

export const logTimings = (project: ProjectContext, timings: Array<[number, string]>): void => {
    if (timings.length > 1) {
        const last = timings[timings.length - 1][0];
        const first = timings[0][0];
        const totalTime = last - first;

        const hint = hintExpandPattern(project, 'timings');
        const time = formatMilieconds(totalTime);
        logInfo('Build timings', yellow(time), hint);

        if (shouldExpand(project, 'timings')) {
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
    }
};
