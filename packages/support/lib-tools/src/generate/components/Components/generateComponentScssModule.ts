import { writeFile } from 'fs/promises';

import { CompilerContext } from '@noodles-ui/core-compiler';
import {
    ComponentBuildContext,
    ComponentOwnEntity,
    PropEntity,
    getComponentMixins,
    getPropMixin,
    getPropVariantName,
    getVariantPropsWithMixin,
} from '@noodles-ui/core-entities';
import { MixinInlineResource } from '@noodles-ui/core-resources';

import { ensureFileDir } from '../../../util/ensureFileDir';
import { diffDateNow, getDateNow } from '../../../util/time';
import { createMixinImportStatement } from '../../mixins/createMixinImportStatement';
import { createMixinStatement } from '../../mixins/createMixinStatement';
import { indent } from '../../text/indent';
import { tsFileHeader } from '../../typescript/tsFileHeader';
import { componentScssModuleFileName } from '../paths/componentScssModuleFileName';

const mixinImportStatements = (
    compiler: CompilerContext,
    component: ComponentBuildContext,
): string[] => {
    const entity = component.entity as ComponentOwnEntity;

    const componentMixins = getComponentMixins(entity);
    const props = getVariantPropsWithMixin(entity);
    const propMixins = props.map(getPropMixin).filter(Boolean) as MixinInlineResource[];

    return [...componentMixins, ...propMixins].map(mixin =>
        createMixinImportStatement(compiler, mixin),
    );
};

const mixinImplementationStatements = (
    compiler: CompilerContext,
    component: ComponentBuildContext,
    mixin: MixinInlineResource,
): string[] => {
    const entity = component.entity as ComponentOwnEntity;
    return [createMixinStatement(compiler, mixin, entity.vars)];
};

const variantImplementationStatements = (
    compiler: CompilerContext,
    component: ComponentBuildContext,
    prop: PropEntity,
    mixin: MixinInlineResource,
): string[] => {
    const variantName = getPropVariantName(prop);
    const entity = component.entity as ComponentOwnEntity;
    const extraVars = { ...entity.vars, VARIANTS: variantName };
    const code = [createMixinStatement(compiler, mixin, extraVars)];
    return [`&-${prop.name}- {`, ...indent(code), '}'];
};

const componentStatements = (
    compiler: CompilerContext,
    component: ComponentBuildContext,
): string[] => {
    const entity = component.entity as ComponentOwnEntity;

    const componentMixinStatements = getComponentMixins(entity).map(mixin =>
        mixinImplementationStatements(compiler, component, mixin),
    );
    const propMixins = getVariantPropsWithMixin(entity)
        .map(prop => [prop, getPropMixin(prop)])
        .filter(([, mixin]) => Boolean(mixin)) as [PropEntity, MixinInlineResource][];

    const propMixinStatements = propMixins.map(([prop, mixin]) =>
        variantImplementationStatements(compiler, component, prop, mixin),
    );

    return [...componentMixinStatements, ...propMixinStatements].flatMap(statement => statement);
};

export const generateComponentScssModule = async (
    compiler: CompilerContext,
    component: ComponentBuildContext,
    targetDir: string,
): Promise<void> => {
    const time = getDateNow();
    const fileName = componentScssModuleFileName(targetDir, component.entity);
    await ensureFileDir(fileName);

    const { entity } = component;
    const name = entity.name;
    const content = [
        ...mixinImportStatements(compiler, component),
        '',
        `.${name} {`,
        ...indent(componentStatements(compiler, component)),
        `}`,
    ];
    const output = tsFileHeader(compiler, fileName) + content.join('\n') + '\n';
    await writeFile(fileName, output);

    compiler.addGeneratedSourceFile({ fileName, success: true, time: diffDateNow(time) });
};
