// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { blue, bold, underline, white } from 'kleur';

export const logInfo = (message: string, detail?: string | number | boolean | object): void => {
    const header = blue().underline().bold(message);
    const parts = [header, detail || '', '\n'];
    console.info(...parts);
};
