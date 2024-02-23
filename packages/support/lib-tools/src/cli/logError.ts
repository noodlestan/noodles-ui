// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { bold, red, underline, white } from 'kleur';

export const logError = (message: string, detail?: string | object): void => {
    const header = red().underline().bold(message);
    const parts = ['\n' + header, detail || '', '\n'];
    console.info(...parts);
};
