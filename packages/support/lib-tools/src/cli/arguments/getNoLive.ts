import { CLI_NO_LIVE_FLAG } from '../constants';

export const getNoLive = (): boolean => {
    const args = Array.from(process.argv);
    return !!args.find(arg => arg === CLI_NO_LIVE_FLAG);
};
