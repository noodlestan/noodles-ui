import { CLI_EXPAND_FLAG } from '../constants';

export const getExpandPatterns = (): string[] => {
    const args = Array.from(process.argv);
    const patterns = [];
    while (args.length) {
        const flag = args.shift();
        if (flag && flag.startsWith(CLI_EXPAND_FLAG)) {
            const value = args[0];
            if (value && !value.startsWith('--expand')) {
                args.shift();
                patterns.push(value);
            }
        }
    }
    return patterns;
};
