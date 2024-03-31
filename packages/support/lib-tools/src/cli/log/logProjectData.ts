import {
    CompilerContext,
    EntityBuildContext,
    EntityBuildMap,
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
    compiler: CompilerContext,
    label: string,
    items: EntityBuildMap<EntityBuildContext<T, V>>,
    itemsWithWarnings: ItemsWithErrors,
    itemsWithErrors: ItemsWithErrors,
) {
    const count = items.size;

    if (shouldExpand(compiler, 'project')) {
        logMessage(`${label} (${count})`);
        if (!count) {
            logMessage('  ' + gray('<empty>'));
        }
    }
    items.forEach(item => {
        const { context, entity } = item;
        const { public: isPublic, consumes, consumers } = context;
        const isExpanded = shouldExpand(compiler, entity);
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
        if (!isExpanded && shouldExpand(compiler, 'project')) {
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

const allProjectEntities = (compiler: CompilerContext): Array<UnknownBuildContext> => {
    const { surface, theme, mixin, variant, component, token } = compiler.entities;
    return [
        ...Array.from(surface.values()),
        ...Array.from(theme.values()),
        ...Array.from(mixin.values()),
        ...Array.from(variant.values()),
        ...Array.from(component.values()),
        ...Array.from(token.values()),
    ];
};
const countProjectEntities = (compiler: CompilerContext): number => {
    return allProjectEntities(compiler).length;
};

export const logProjectData = (compiler: CompilerContext): void => {
    const { surface, theme, mixin, variant, component, token } = compiler.entities;

    const itemsWithWarnings = getItemsWithWarnings(compiler.diagnostics);
    const itemsWithErrors = getItemsWithErrors(compiler.diagnostics);

    const entityCount = countProjectEntities(compiler);
    const count = entityCount
        ? yellow(entityCount) + plural(entityCount, ' item') + ' '
        : gray('0 items ');

    const hint = hintExpandPattern(compiler, 'project');
    logInfo('Project data', count, hint);

    if (shouldExpand(compiler, 'project')) {
        logMessage('  Name:', compiler.entities.project.name);
        logMessage('  Module:', compiler.entities.project.module);
        console.info('');
    }

    const errorCount = getDiagnosticErrors(compiler.diagnostics).length;
    if (errorCount) {
        logWarning(
            'Attention:',
            yellow('Items may be incomplete and generated code may contain errors'),
        );
    }

    console.info('');
    logResourceGroup(compiler, 'Surfaces', surface, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(compiler, 'Mixins', mixin, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(compiler, 'Variants', variant, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(compiler, 'Components', component, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(compiler, 'Tokens', token, itemsWithWarnings, itemsWithErrors);
    logResourceGroup(compiler, 'Themes', theme, itemsWithWarnings, itemsWithErrors);

    if (shouldExpand(compiler, 'project')) {
        console.info('');
    }
};
