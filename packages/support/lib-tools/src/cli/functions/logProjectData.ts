// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gray, green, red, yellow } from 'kleur';

import { getResourceModule } from '../../project/resources/getResourceModule';
import { getResourceName } from '../../project/resources/getResourceName';
import { getResourceType } from '../../project/resources/getResourceType';
import { getResourceTypedKey } from '../../project/resources/getResourceTypedKey';
import { ItemContext, ProjectContext, ProjectDiagnosticSource } from '../../types/projects';
import { UnknownResource } from '../../types/resources';

import { logInfo } from './logInfo';
import { logMessage } from './logMessage';

type ItemsWithErrors = {
    [key: string]: number;
};

const debugMatch = (resource: UnknownResource) => {
    const type = getResourceType(resource);
    const name = getResourceName(resource);
    const module = getResourceModule(resource);

    return (pattern: string): boolean => {
        if (pattern === type || pattern === type + 's') {
            return true;
        }
        if (pattern.startsWith('@') && module.includes(pattern.substring(1))) {
            return true;
        }
        if (name.includes(pattern)) {
            return true;
        }
        return false;
    };
};

const getSourceKey = (source: ProjectDiagnosticSource): string => {
    if (typeof source === 'string') {
        return source;
    }
    return getResourceTypedKey(source);
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
        const isExpanded = project.debug.find(debugMatch(resource || instance));
        const itemKey = getSourceKey(instance || resource);
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
            console.info('instance', instance);
            console.info('consumes', item.consumes);
            console.info('consumers', item.consumers);
            console.info('');
        }
    });
}

export const logProjectData = (project: ProjectContext): void => {
    const { surfaces, themes, variants, components, tokens } = project;

    const itemsWithErrors = project.diagnostics.reduce((acc, item) => {
        const sourceKey = getSourceKey(item.source);
        acc[sourceKey] = acc[sourceKey] || 0;
        acc[sourceKey]++;
        return acc;
    }, {} as ItemsWithErrors);

    logInfo('Project data', project.diagnostics.length ? red('maybe incomplete') : '');
    logResourceGroup(project, 'Surfaces', surfaces.items, itemsWithErrors);
    logResourceGroup(project, 'Themes', themes.items, itemsWithErrors);
    logResourceGroup(project, 'Variants', variants.items, itemsWithErrors);
    logResourceGroup(project, 'Components', components.items, itemsWithErrors);
    logResourceGroup(project, 'Surfaces', tokens.items, itemsWithErrors);
    console.info('');
};
