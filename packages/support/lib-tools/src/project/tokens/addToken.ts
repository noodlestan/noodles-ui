import { ProjectContext, TokenContext } from '@noodles-ui/support-types';

import { logMessage } from '../../cli/logger/logMessage';
import { getResourceKey } from '../resources/getResourceKey';

export const addToken = (project: ProjectContext, context: TokenContext): void => {
    const { tokens: items } = project;
    const { resource, instance: token } = context;

    if (!token) {
        project.addDiagnostic(resource, 'No instance generated.');
        return;
    }

    if ('name' in token && !token.name) {
        project.addDiagnostic(resource, 'No token name.');
        return;
    }

    // TODO these should already be all named tokens?
    // or should we store the patterns as private resources as well? with source reference, etc...
    const name = 'name' in token ? token.name : token.pattern;
    const key = getResourceKey({ ...token, name });
    if (items.has(key)) {
        project.addDiagnostic(resource, `Duplicate token key "${key}".`);
        return;
    }

    logMessage('+ token', key);
    items.set(key, context);
};
