export const safeName = (word: string): string => {
    return word.replace(/[^a-z0-9]/gi, '');
};
