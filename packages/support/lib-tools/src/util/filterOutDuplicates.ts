export const filterOutDuplicates = (value: unknown, index: number, array: unknown[]): boolean => {
    return array.indexOf(value) === index;
};
