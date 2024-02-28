import { VariantResource } from '@noodles-ui/core-types';

import { logError } from '../../cli/logError';
import { logMessage } from '../../cli/logMessage';
import { ProjectContext, VariantContext } from '../../types/projects';

export const addVariant = (
    project: ProjectContext,
    variant: VariantResource,
    context: Omit<VariantContext, 'meta'>,
): void => {
    const { items } = project.variants;

    if ('name' in variant && !variant.name) {
        logError('! variant name', { variant });
        return;
    }

    const key = variant.name || '';
    if (items.has(key)) {
        logError('! duplicate variant', key);
        return;
    }

    logMessage('+ variant', key);
    const item = { meta: variant, ...context };
    items.set(key, item);
};
