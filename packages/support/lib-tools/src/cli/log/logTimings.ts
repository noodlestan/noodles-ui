import { CompilerContext } from '@noodles-ui/support-types';
import { gray, yellow } from 'kleur';

import { formatSeconds } from '../../util/string';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

export const logTimings = (compiler: CompilerContext, timings: Array<[number, string]>): void => {
    if (timings.length > 1) {
        const last = timings[timings.length - 1][0];
        const first = timings[0][0];
        const totalTime = last - first;

        const hint = hintExpandPattern(compiler, 'timings');
        const time = formatSeconds(totalTime);
        logInfo('Build time', yellow(time), hint);

        if (shouldExpand(compiler, 'timings')) {
            logMessage('  ' + gray('Total:'), formatSeconds(totalTime));
            timings.forEach(([ts, name], index) => {
                if (!index) {
                    return;
                }
                const previous = timings[index - 1];
                const [previousTs] = previous;
                logMessage('  - ' + gray(name), formatSeconds(ts - previousTs));
            });
            console.info('');
        }
    }
};
