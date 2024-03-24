import { ProjectResource } from '@noodles-ui/core-types';
import { ProjectContext } from '@noodles-ui/support-types';
import { gray, yellow } from 'kleur';

import { plural } from '../../util/string';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

export const logProjectResource = (project: ProjectContext, resource: ProjectResource): void => {
    const { surfaces, variants, components, themes } = resource.entities;
    const total = [...surfaces, ...variants, ...components, ...themes].length;

    if (!shouldExpand(project, 'resources')) {
        const counts = yellow(total) + plural(total, ' resource');
        const hint = hintExpandPattern(project, 'resources');
        logInfo('Project resources', counts, hint);
        return;
    }
    logInfo(`Project resources`);
    const surfaceCount = Object.keys(surfaces).length;
    const variantCount = Object.keys(variants).length;
    const componentCount = Object.keys(components).length;
    const themeCount = Object.keys(themes).length;

    logMessage(`Surfaces (${surfaceCount})`);
    if (!surfaceCount) {
        logMessage('  ' + gray('<empty>'));
    }
    for (const item of surfaces) {
        logMessage('  ' + gray(item.module), item.name);
    }

    logMessage(`Themes (${themeCount})`);
    if (!themeCount) {
        logMessage('  ' + gray('<empty>'));
    }
    for (const item of themes) {
        logMessage('  ' + gray(item.module), item.name);
    }

    logMessage(`Variants (${variantCount})`);
    if (!variantCount) {
        logMessage('  ' + gray('<empty>'));
    }
    for (const item of variants) {
        logMessage('  ' + gray(item.module), item.name);
    }

    logMessage(`Components (${componentCount})`);
    if (!componentCount) {
        logMessage('  ' + gray('<empty>'));
    }
    for (const item of components) {
        logMessage('  ' + gray(item.module), item.name);
    }

    console.info('');
};
