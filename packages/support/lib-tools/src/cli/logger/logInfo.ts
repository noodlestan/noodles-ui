import { blue } from 'kleur';

export const logInfo = (
    message: string,
    detail?: string | number | boolean | object,
    hint?: string,
): void => {
    const header = blue().underline().bold(message);
    const parts = [header, detail || '', hint || ''];
    console.info(...parts);
};
