import { CLI_NO_EMIT_FLAG } from '../constants';

export const getNoEmit = (): boolean => {
    const args = Array.from(process.argv);
    return !!args.find(arg => arg === CLI_NO_EMIT_FLAG);
};
