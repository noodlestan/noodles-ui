import { bold, gray, red, yellow } from 'kleur';

import { plural } from '../../util/plural';

export const formatWarningsAndErrors = (warnCount: number, errorCount: number): string => {
    const warnings = warnCount ? yellow(bold(warnCount) + plural(warnCount, ' warning')) : '';
    const errors = errorCount ? red(bold(errorCount) + plural(errorCount, ' error')) : '';
    const issues = [warnings, errors].filter(Boolean);
    return warnCount + errorCount ? gray('(' + issues.join(', ') + ')') : '';
};
