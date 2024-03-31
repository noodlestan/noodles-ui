import {
    EntityBuildContext,
    EntityBuildMap,
    ProjectContext,
    ResourceContext,
    UnknownBuildContext,
    UnknownResource,
    getDiagnosticErrors,
    getItemsWithErrors,
    getItemsWithWarnings,
} from '@noodles-ui/support-types';
import { blue, gray, red, white, yellow } from 'kleur';

import { getResourceModule } from '../../project/resources/getters/getResourceModule';
import { getResourceName } from '../../project/resources/getters/getResourceName';
import { getResourceType } from '../../project/resources/getters/getResourceType';
import { getResourceTypedKey } from '../../project/resources/getters/getResourceTypedKey';
import { plural } from '../../util/string';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';
import { logWarning } from '../logger/logWarning';

import { formatWarningsAndErrors } from './formatWarningsAndErrors';
import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

type ItemsWithErrors = {
    [key: string]: number;
};

function logResourceGroup<T extends ResourceContext<UnknownResource>, V extends UnknownResource>(
    project: ProjectContext,
    label: string,
    items: EntityBuildMap<EntityBuildContext<T, V>>,
    itemsWithWarnings: ItemsWithErrors,
    itemsWithErrors: ItemsWithErrors,
) {
    const count = items.size;

    if (shouldExpand(project, 'project')) {
        logMessage(`${label} (${count})`);
        if (!count) {
            logMessage('  ' + gray('<empty>'));
        }
    }
    items.forEach(item => {
        const { context, entity } = item;
        const { public: isPublic, consumes, consumers } = context;
        const isExpanded = shouldExpand(project, entity);
        const type = getResourceType(entity);
        const itemKey = getResourceTypedKey(entity);
        const name = getResourceName(entity);
        const mod = getResourceModule(entity);
        const warnCount = itemsWithWarnings[itemKey] || 0;
        const errorCount = itemsWithErrors[itemKey] || 0;
        const publicTag = isPublic ? blue(' public') : '';
        const formatedName = errorCount ? red(name) : warnCount ? yellow(name) : white(name);
        const counts = formatWarningsAndErrors(warnCount, errorCount);
        const title = formatedName + (counts ? ' ' + counts : '') + publicTag;
        if (!isExpanded && shouldExpand(project, 'project')) {
            logMessage('  ' + gray(mod), title);
        } else if (isExpanded) {
            logMessage('  ' + type + '  ' + gray(mod), title);
            console.info('');
            console.info('public:', isPublic);
            Object.entries(entity || {}).forEach(([key, value]) =>
                console.info('entity.' + key, value),
            );
            console.info('consumes:', consumes);
            console.info('consumers:', consumers);
            console.info('');
        }
    });
}

const allProjectEntities = (project: ProjectContext): Array<UnknownBuildContext> => {
    const { surface, theme, mixin, variant, component, token } = project.entities;
    return [
        ...Array.from(surface.values()),
        ...Array.from(theme.values()),
        ...Array.from(mixin.values()),
        ...Array.from(variant.values()),
        ...Array.from(component.values()),
        ...Array.from(token.values()),
    ];
};
const countProjectEntities = (project: ProjectContext): number => {
    return allProjectEntities(project).length;
};

export const logProjectData = (project: ProjectContext): void => {
    const { surface, theme, mixin, variant, component, token } = project.entities;

    const itemsWithWarnings = getItemsWithWarnings(project.diagnostics);
    const itemsWithErrors = getItemsWithErrors(project.diagnostics);

    const entityCount = countProjectEntities(project);
    const count = entityCount
        ? yellow(entityCount) + plural(entityCount, ' item') + ' '
        : gray('0 items ');

    const hint = hintExpandPattern(project, 'project');
    logInfo('Project data', count, hint);

    if (shouldExpand(project, 'project')) {
        logMessage('  Name:', project.entities.project.name);
        logMessage('  Module:', project.entities.project.module);
        console.info('');
    }

    const errorCount = getDiagnosticErrors(project.diagnostics).length;
    if (errorCount) {
        logWarning(
            'Attention:',
            yellow('Items may be incomplete and generated code may contain errors'),
        );
    }

    console.info('');
    logResourceGroup(project, 'Surfaces', surface, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(project, 'Mixins', mixin, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(project, 'Variants', variant, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(project, 'Components', component, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(project, 'Tokens', token, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(project, 'Themes', theme, itemsWithWarnings, itemsWithErrors);

    if (shouldExpand(project, 'project')) {
        console.info('');
    }
};
