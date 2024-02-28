import { TokenResource } from '@noodles-ui/core-types';

import { logError } from '../../cli/logError';
import { logMessage } from '../../cli/logMessage';
import { ProjectContext, TokenContext } from '../../types/projects';

export const addToken = (
    project: ProjectContext,
    token: TokenResource,
    option: string,
    context: Omit<TokenContext, 'meta'>,
): void => {
    const { items } = project.tokens;

    if ('name' in token && !token.name) {
        logError('! token name', { token, option });
        return;
    }

    const key = 'name' in token ? token.name : token.pattern;
    if (items.has(key)) {
        logError('! duplicate token', key);
        return;
    }

    logMessage('+ token', key);
    const item = { meta: token, ...context };
    items.set(key, item);
};
