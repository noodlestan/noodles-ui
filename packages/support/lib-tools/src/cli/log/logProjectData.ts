// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ItemContext, ProjectContext, UnknownResource } from '@noodles-ui/support-types';
import { gray, green, red, yellow } from 'kleur';

import { getResourceModule } from '../../project/resources/getResourceModule';
import { getResourceName } from '../../project/resources/getResourceName';
import { getResourceTypedKey } from '../../project/resources/getResourceTypedKey';
import { logError } from '../logger/logError';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { getDiagnosticKey } from './getDiagnosticKey';
import { shouldExpand } from './shouldExpand';

type ItemsWithErrors = {
    [key: string]: number;
};

function logResourceGroup<T extends UnknownResource>(
    project: ProjectContext,
    label: string,
    items: Map<string, ItemContext<T>>,
    itemsWithErrors: ItemsWithErrors,
) {
    const count = items.size;
    logMessage(`${label} (${count})`);
    if (!count) {
        logMessage('  ' + gray('<empty>'));
    }
    items.forEach(item => {
        const { resource, instance, public: isPublic } = item;
        const isExpanded = shouldExpand(project, resource || instance);
        const itemKey = getResourceTypedKey(instance || resource);
        const name = instance ? getResourceName(instance) : red(getResourceName(resource));
        const mod = instance ? getResourceModule(instance) : red(getResourceModule(resource));
        const errors = (itemsWithErrors[itemKey] || 0) + (!instance ? 1 : 0);
        const publicTag = isPublic ? green(' public') : '';
        const formatedName = (errors ? red(`${name} (${errors})`) : yellow(name)) + publicTag;
        if (!isExpanded) {
            logMessage('  ' + gray(mod), formatedName);
        } else {
            // rename to logDetail - same as Info but gray
            console.info('');
            logMessage('  ' + gray(mod), formatedName);
            console.info('');
            console.info('public:', item.public);
            console.info('---');
            const ignore = ['name', 'type', 'module'];
            Object.entries(instance || {})
                .filter(([key]) => !ignore.includes(key))
                .forEach(([key, value]) => console.info(key, value));
            console.info('---');
            console.info('consumes:', item.consumes);
            console.info('consumers:', item.consumers);
            console.info('');
        }
    });
}

export const logProjectData = (project: ProjectContext): void => {
    const { surface, theme, variant, component, token } = project.entities;

    const itemsWithErrors = project.diagnostics.reduce((acc, item) => {
        const sourceKey = getDiagnosticKey(project, item.source);
        acc[sourceKey] = acc[sourceKey] || 0;
        acc[sourceKey]++;
        return acc;
    }, {} as ItemsWithErrors);

    logInfo('Project data');
    if (project.diagnostics.length) {
        logError('Attention:', red('data may be incomplete and generated code may contain errors'));
    }
    logResourceGroup(project, 'Surfaces', surface, itemsWithErrors);
    logResourceGroup(project, 'Themes', theme, itemsWithErrors);
    logResourceGroup(project, 'Variants', variant, itemsWithErrors);
    logResourceGroup(project, 'Components', component, itemsWithErrors);
    logResourceGroup(project, 'Surfaces', token, itemsWithErrors);
    console.info('');
};
