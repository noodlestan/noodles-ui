import { red } from 'kleur';

export const logError = (message: string, detail?: string | number | boolean | object): void => {
    const header = red().underline().bold(message);
    const parts = [header, detail || ''];
    console.error(...parts);
};
