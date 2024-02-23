import { resolve } from 'path';

import ts from 'typescript';

export const getCompilerOptions = (): ts.ParsedCommandLine => {
    const configFileName = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
    if (!configFileName) {
        throw new Error(`Could not resolve "tsconfig.json" location for path "${resolve('./')}".`);
    }
    const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
    const compilerOptions = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './');
    return compilerOptions;
};
