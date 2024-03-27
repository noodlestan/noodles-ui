import { yellow } from 'kleur';

export const logWarning = (
    message: string,
    detail?: string | number | boolean | object,
    hint?: string,
): void => {
    const header = yellow().underline().bold(message);
    const parts = [header, detail || '', hint || ''];
    console.error(...parts);
};
