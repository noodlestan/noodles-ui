import { writeFile } from 'fs/promises';

import { ComponentOwnEntity, MixinInlineResource, PropEntity } from '@noodles-ui/core-types';
import { ComponentBuildContext, ProjectContext } from '@noodles-ui/support-types';

import { getComponentMixins } from '../../../entities/component/getters/getComponentMixins';
import { getPropMixin } from '../../../entities/component/prop/getters/getPropMixin';
import { getPropVariantName } from '../../../entities/component/prop/getters/getPropVariantName';
import { getVariantPropsWithMixin } from '../../../entities/component/prop/getters/getVariantPropsWithMixin';
import { ensuredFiledir } from '../../../util/fs';
import { diffDateNow, getDateNow } from '../../../util/time';
import { createMixinImportStatement } from '../../mixins/createMixinImportStatement';
import { createMixinStatement } from '../../mixins/createMixinStatement';
import { indent } from '../../text/indent';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentScssModuleFileName } from '../paths/componentScssModuleFileName';

const mixinImportStatements = (
    project: ProjectContext,
    component: ComponentBuildContext,
): string[] => {
    const entity = component.entity as ComponentOwnEntity;

    const componentMixins = getComponentMixins(entity);
    const props = getVariantPropsWithMixin(entity);
    const propMixins = props.map(getPropMixin).filter(Boolean) as MixinInlineResource[];

    return [...componentMixins, ...propMixins].map(mixin =>
        createMixinImportStatement(project, mixin),
    );
};

const mixinImplementationStatements = (
    project: ProjectContext,
    component: ComponentBuildContext,
    mixin: MixinInlineResource,
): string[] => {
    const entity = component.entity as ComponentOwnEntity;
    return [createMixinStatement(project, mixin, entity.vars)];
};

const variantImplementationStatements = (
    project: ProjectContext,
    component: ComponentBuildContext,
    prop: PropEntity,
    mixin: MixinInlineResource,
): string[] => {
    const variantName = getPropVariantName(prop);
    const entity = component.entity as ComponentOwnEntity;
    const extraVars = { ...entity.vars, VARIANTS: variantName };
    const code = [createMixinStatement(project, mixin, extraVars)];
    return [`&-${prop.name}- {`, ...indent(code), '}'];
};

const componentStatements = (
    project: ProjectContext,
    component: ComponentBuildContext,
): string[] => {
    const entity = component.entity as ComponentOwnEntity;

    const componentMixinStatements = getComponentMixins(entity).map(mixin =>
        mixinImplementationStatements(project, component, mixin),
    );
    const propMixins = getVariantPropsWithMixin(entity)
        .map(prop => [prop, getPropMixin(prop)])
        .filter(([, mixin]) => Boolean(mixin)) as [PropEntity, MixinInlineResource][];

    const propMixinStatements = propMixins.map(([prop, mixin]) =>
        variantImplementationStatements(project, component, prop, mixin),
    );

    return [...componentMixinStatements, ...propMixinStatements].flatMap(statement => statement);
};

export const generateComponentScssModule = async (
    project: ProjectContext,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = componentScssModuleFileName(targetDir, component.entity);
    await ensuredFiledir(fileName);

    const { entity } = component;
    const name = entity.name;
    const content = [
        ...mixinImportStatements(project, component),
        '',
        `.${name} {`,
        ...indent(componentStatements(project, component)),
        `}`,
    ];
    const output = tsFileHeader(project, fileName) + content.join('\n') + '\n';
    await writeFile(fileName, output);

    project.addGeneratedSourceFile({ fileName, success: true, time: diffDateNow(time) });
};
