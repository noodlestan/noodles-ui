import { sep } from 'path';

import { ProgramModule } from '../types/program';

const regexStr = `node_modules${sep}([^@/]+|@[^/]+${sep}[^/]+)`;
const regex = new RegExp(regexStr, 'g');

export const getLastNodeModule = (fileName: string): ProgramModule | undefined => {
    const matches = fileName.match(regex);
    const last = matches && matches[matches.length - 1];
    const name = last && last.split('/').slice(1).join(sep);
    const path = last && fileName.substring(0, fileName.lastIndexOf(last) + last.length);
    return name && path ? { name, path } : undefined;
};
