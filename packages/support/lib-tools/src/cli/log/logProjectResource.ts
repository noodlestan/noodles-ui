import { ProjectResource } from '@noodles-ui/core-types';
import { gray } from 'kleur';

import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

export const logProjectResource = (resource: ProjectResource): void => {
    logInfo(`Project resources`);
    const { components, surfaces, themes, variants } = resource.entities;
    const componentCount = Object.keys(components).length;
    const surfaceCount = Object.keys(surfaces).length;
    const themeCount = Object.keys(themes).length;
    const variantCount = Object.keys(variants).length;

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
