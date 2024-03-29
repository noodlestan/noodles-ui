import { green } from 'kleur';

export const logSuccess = (message: string, detail?: string | number | boolean | object): void => {
    // console.info(green().underline().bold(message) + (detail ? ' ' + green(`${detail}`) : ''));
    const header = green().underline().bold(message);
    const parts = [header, detail || ''];
    console.info(...parts);
};
