// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { bgGreen, bold, green, white } from 'kleur';

export const logSuccess = (message: string, detail?: string | object): void => {
    // console.info(green().underline().bold(message) + (detail ? ' ' + green(`${detail}`) : ''));
    const header = green().underline().bold(message);
    const parts = ['\n' + header, detail || '', '\n'];
    console.info(...parts);
};
