import prettier from 'prettier';

export const formatSourceCodeWithPrettier = async (
    fileName: string,
    output: string,
): Promise<string> => {
    const options = await prettier.resolveConfig(fileName);
    const formatted = await prettier.format(output, { ...options, parser: 'typescript' });
    return formatted;
};
