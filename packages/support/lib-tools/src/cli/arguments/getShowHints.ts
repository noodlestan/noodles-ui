import { CLI_HINT_FLAG } from '../constants';

export const getShowHints = (): boolean => {
    const args = Array.from(process.argv);
    return !!args.find(arg => arg === CLI_HINT_FLAG);
};
