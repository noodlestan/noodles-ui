import { writeFile } from 'fs/promises';

import { ComponentOwnEntity, MixinInlineResource, MixinResource } from '@noodles-ui/core-types';
import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { getComponentMixins } from '../../../entities/component/getters/getComponentMixins';
import { getPropMixin } from '../../../entities/component/prop/getters/getPropMixin';
import { getVariantPropsWithMixin } from '../../../entities/component/prop/getters/getVariantPropsWithMixin';
import { indent } from '../../text/indent';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentScssModuleFileName } from '../paths/componentScssModuleFileName';

const mixinImportStatement = (
    project: ProjectContext,
    component: ComponentBuildContext,
    mixin: MixinResource | MixinInlineResource,
): string => {
    return `@import '${mixin.source}';`;
};

const mixinImportStatements = (
    project: ProjectContext,
    component: ComponentBuildContext,
): string[] => {
    const entity = component.entity as ComponentOwnEntity;

    const componentMixins = getComponentMixins(entity);
    const props = getVariantPropsWithMixin(entity);
    const propMixins = props.map(getPropMixin).filter(Boolean) as MixinInlineResource[];

    return [...componentMixins, ...propMixins].map(mixin =>
        mixinImportStatement(project, component, mixin),
    );
};

const formatStatement = (
    project: ProjectContext,
    component: ComponentBuildContext,
    mixin: MixinInlineResource,
): string => {
    const entity = component.entity as ComponentOwnEntity;
    // TODO FUCK
    const variantName = 'TextVariant';
    const vars = { ...entity.vars, variable: variantName };
    return Object.entries(vars).reduce((acc, [name, value]) => {
        return acc.replace(`#{${name}}`, value);
    }, mixin.implementation);
};

const mixinImplementationStatements = (
    project: ProjectContext,
    component: ComponentBuildContext,
    mixin: MixinInlineResource,
): string[] => {
    return [formatStatement(project, component, mixin)];
};

const variantImplementationStatements = (
    project: ProjectContext,
    component: ComponentBuildContext,
    mixin: MixinInlineResource,
): string[] => {
    const code = [formatStatement(project, component, mixin)];
    // TODO FUCK
    const propName = 'variant';
    return [`&-${propName}- {`, ...indent(code), '}'];
};

const mixinStatemetents = (
    project: ProjectContext,
    component: ComponentBuildContext,
    mixin: MixinInlineResource,
): string[] => {
    if (mixin.role === 'scss:mixin') {
        return mixinImplementationStatements(project, component, mixin);
    } else if (mixin.role === 'scss:variant') {
        return variantImplementationStatements(project, component, mixin);
    }
    return [];
};

const componentStatements = (
    project: ProjectContext,
    component: ComponentBuildContext,
): string[] => {
    const entity = component.entity as ComponentOwnEntity;

    const componentMixins = getComponentMixins(entity);
    const props = getVariantPropsWithMixin(entity);
    const propMixins = props.map(getPropMixin).filter(Boolean) as MixinInlineResource[];

    return [...componentMixins, ...propMixins].flatMap(mixin =>
        mixinStatemetents(project, component, mixin),
    );
};

export const generateComponentScssModule = async (
    project: ProjectContext,
    component: ComponentBuildContext,
): Promise<void> => {
    const { entity } = component;
    const name = entity.name;
    const fileName = componentScssModuleFileName(project, component.entity);

    const content = [
        ...mixinImportStatements(project, component),
        '',
        `.${name} {`,
        ...indent(componentStatements(project, component)),
        `}`,
    ];
    const output = tsFileHeader(project, fileName) + content.join('\n') + '\n';
    await writeFile(fileName, output);

    project.addGeneratedSourceFile({ fileName, success: true });
};
