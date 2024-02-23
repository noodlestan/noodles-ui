export const stripFilename = (filename: string, pathToStrip?: string): string => {
    if (!pathToStrip || !filename.startsWith(pathToStrip)) {
        return filename;
    } else {
        return filename.replace(pathToStrip, '.');
    }
};
