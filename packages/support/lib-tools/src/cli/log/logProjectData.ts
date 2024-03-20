// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
    EntityBuildContext,
    EntityBuildMap,
    ProjectContext,
    ResourceContext,
    UnknownResource,
} from '@noodles-ui/support-types';
import { gray, green, red, yellow } from 'kleur';

import { getResourceModule } from '../../project/resources/getters/getResourceModule';
import { getResourceName } from '../../project/resources/getters/getResourceName';
import { getResourceTypedKey } from '../../project/resources/getters/getResourceTypedKey';
import { logError } from '../logger/logError';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { getDiagnosticKey } from './getDiagnosticKey';
import { shouldExpand } from './shouldExpand';

type ItemsWithErrors = {
    [key: string]: number;
};

function logResourceGroup<T extends ResourceContext<UnknownResource>, V extends UnknownResource>(
    project: ProjectContext,
    label: string,
    items: EntityBuildMap<EntityBuildContext<T, V>>,
    itemsWithErrors: ItemsWithErrors,
) {
    const count = items.size;
    logMessage(`${label} (${count})`);
    if (!count) {
        logMessage('  ' + gray('<empty>'));
    }
    items.forEach(item => {
        const { context, entity } = item;
        const { resource, public: isPublic, consumes, consumers } = context;
        const isExpanded = shouldExpand(project, entity);
        const itemKey = getResourceTypedKey(entity || resource);
        const name = entity ? getResourceName(entity) : red(getResourceName(resource));
        const mod = entity ? getResourceModule(entity) : red(getResourceModule(resource));
        const errors = (itemsWithErrors[itemKey] || 0) + (!entity ? 1 : 0);
        const publicTag = isPublic ? green(' public') : '';
        const formatedName = (errors ? red(`${name} (${errors})`) : yellow(name)) + publicTag;
        if (!isExpanded) {
            logMessage('  ' + gray(mod), formatedName);
        } else {
            // rename to logDetail - same as Info but gray
            console.info('');
            logMessage('  ' + gray(mod), formatedName);
            console.info('');
            console.info('public:', isPublic);
            console.info('---');
            const ignore = ['name', 'type', 'module'];
            Object.entries(entity || {})
                .filter(([key]) => !ignore.includes(key))
                .forEach(([key, value]) => console.info(key, value));
            console.info('---');
            console.info('consumes:', consumes);
            console.info('consumers:', consumers);
            console.info('');
        }
    });
}

export const logProjectData = (project: ProjectContext): void => {
    const { surface, theme, mixin, variant, component, token } = project.entities;

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
    logResourceGroup(project, 'Mixins', mixin, itemsWithErrors);
    logResourceGroup(project, 'Variants', variant, itemsWithErrors);
    logResourceGroup(project, 'Components', component, itemsWithErrors);
    logResourceGroup(project, 'Tokens', token, itemsWithErrors);
    console.info('');
};
