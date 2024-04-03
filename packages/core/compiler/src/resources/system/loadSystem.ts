import { ComponentEntity, SystemContext, SystemEntity } from '@noodles-ui/core-entities';
import {
    ComponentResource,
    MixinResource,
    SystemResource,
    getResourceKey,
    getResourceTypedKey,
} from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { newResourceContextPublicWithConsumer } from '../../context/newResourceContextPublicWithConsumer';
import { CompilerContext } from '../../types';
import { loadComponent } from '../component/loadComponent';

import { addSystem } from './private/addSystem';
import { loadSystemMixin } from './private/loadSystemMixin';

export const loadSystemSurfaceComponent = (
    compiler: CompilerContext,
    context: SystemContext,
    component: ComponentResource,
): ComponentEntity | undefined => {
    const componentCcontext = newResourceContextPublicWithConsumer(context, component);

    return loadComponent(compiler, componentCcontext);
};

export const loadSystem = (compiler: CompilerContext): SystemEntity | undefined => {
    const { name, module } = compiler.project;
    const { system: inline } = compiler.project;

    const system: SystemResource = {
        type: 'system',
        name,
        module,
        ...structuredClone(inline),
    };

    const context = newResourceContextPublic<SystemResource>(system);

    const actualMixins: MixinResource[] =
        (inline?.use
            ?.map(mixin => loadSystemMixin(compiler, context, system, mixin))
            .filter(Boolean) as MixinResource[]) || [];
    system.use = actualMixins;

    if (system.surface) {
        const surfaceComponent = loadSystemSurfaceComponent(
            compiler,
            context,
            system.surface.component,
        );
        if (!surfaceComponent) {
            const key = getResourceKey(system.surface.component);
            compiler.addError(system, `Could not load surface component "${key}"`);
        } else {
            context.consumes.add(getResourceTypedKey(surfaceComponent));
        }
    }

    return addSystem(compiler, context, system);
};
