// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { bold, underline, white } from 'kleur';

export const logMessage = (message: string, detail?: string | object): void => {
    const header = white().bold(message);
    const parts = [header, detail || ''];
    console.info(...parts);
};
