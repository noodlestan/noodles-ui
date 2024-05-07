import { CompilerContext } from '@noodles-ui/core-compiler';
import {
    NUIProjectResource,
    UnknownResource,
    getResourceModule,
    getResourceName,
} from '@noodles-ui/core-resources';
import { gray, yellow } from 'kleur';

import { plural } from '../../util/plural';
import { logInfo } from '../logger/logInfo';
import { logMessage } from '../logger/logMessage';

import { hintExpandPattern } from './hintExpandPattern';
import { shouldExpand } from './shouldExpand';

export const logProjectResource = (
    compiler: CompilerContext,
    project: NUIProjectResource,
): void => {
    const {
        surfaces = [],
        mixins = [],
        variants = [],
        components = [],
        tokens = [],
        themes = [],
    } = project.resources;
    const total = [...surfaces, ...mixins, ...variants, ...components, ...tokens, ...themes].length;

    if (!shouldExpand(compiler, 'resources')) {
        const counts = yellow(total) + plural(total, ' resource');
        const hint = hintExpandPattern(compiler, 'resources');
        logInfo('Project resources', counts, hint);
        return;
    }
    logInfo(`Project resources`);
    const resources = {
        surface: surfaces,
        mixin: mixins,
        variant: variants,
        component: components,
        token: tokens,
        theme: themes,
    };
    for (const key in resources) {
        const type = key as keyof typeof resources;
        const count = resources[type].length;
        logMessage(`${key}s`, count);
        for (const item of resources[type]) {
            const resource = item as UnknownResource;
            logMessage('  ' + gray(getResourceModule(resource)), getResourceName(resource));
        }
    }
    console.info('');
};
