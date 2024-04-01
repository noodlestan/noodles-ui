import { SystemEntity } from '@noodles-ui/core-entities';
import { MixinResource, ProjectResource, SystemResource } from '@noodles-ui/core-resources';

import { newResourceContextPublic } from '../../context/newResourceContextPublic';
import { CompilerContext } from '../../types';

import { addSystem } from './private/addSystem';
import { loadSystemMixin } from './private/loadSystemMixin';

export const loadSystem = (
    compiler: CompilerContext,
    project: ProjectResource,
): SystemEntity | undefined => {
    const { name, module } = project;
    const { system: inline } = project;

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

    return addSystem(compiler, context, system);
};