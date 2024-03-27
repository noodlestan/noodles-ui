export const logMessage = (message: string, detail?: string | number | boolean | object): void => {
    const header = message;
    const parts = [header, detail || ''];
    console.info(...parts);
};
