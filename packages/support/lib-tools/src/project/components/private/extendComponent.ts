import {
    ComponentExtendResource,
    ComponentGeneratedResource,
    ComponentOwnResource,
    ComponentResource,
    ExtendParams,
    LocalPropResource,
    PropInlineResource,
    VariantResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../types/projects';
import { resolveExtendWithParams } from '../../resources/resolveExtendWithParams';
import { isVariantExtendResource } from '../../variants/private/isVariantExtendResource';
import { isVariantInlineReferenceResource } from '../../variants/private/isVariantInlineReferenceResource';

import { isComponentExtendResource } from './isComponentExtendResource';
import { isComponentGeneratedResource } from './isComponentGeneratedResource';

type Props = {
    [name: string]: LocalPropResource;
};

const getRenderedProps = (
    project: ProjectContext,
    context: ComponentContext,
    parent: ComponentGeneratedResource,
): Props => {
    const { from, name } = parent.render;

    const { parts } = from;

    const part = parts.find(part => part.name === name);

    if (!part) {
        project.addDiagnostic(
            context.resource,
            `Could not extend component with a default prop. Parent does not expose "${name}".`,
        );
    }

    return part?.props || {};
};

const resolveParentProps = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
    parent: ComponentResource,
    parentParams: ExtendParams,
): Props => {
    const generated = isComponentGeneratedResource(parent);
    if (generated) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return mergeProps(
            project,
            context,
            parent,
            getRenderedProps(project, context, generated),
            parentParams,
        );
    } else {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return mergeProps(project, context, parent, {}, parentParams);
    }
};

const extendPropWithParams = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentResource,
    prop: LocalPropResource,
    parentParams: ExtendParams,
): LocalPropResource => {
    const propIsVariantExtendResource = isVariantExtendResource(prop);
    if (propIsVariantExtendResource) {
        const { parent, params } = resolveExtendWithParams<VariantResource>(
            propIsVariantExtendResource.extend,
        );
        const actualParams = structuredClone(params);
        for (const key in params) {
            if ((params[key] as string) === '#{}') {
                params[key] = parentParams[key];
            }
        }
        return { ...prop, extend: [parent, actualParams] };
    } else {
        return prop;
    }
};

const exposeProp = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentResource,
    prop: LocalPropResource,
    parentParams: ExtendParams,
    overrides?: PropInlineResource,
): LocalPropResource => {
    const actualProp = extendPropWithParams(project, context, component, prop, parentParams);
    return Object.assign({}, actualProp, overrides);
};

const mergeProps = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentResource,
    parentProps: Props,
    parentParams?: ExtendParams,
): Props => {
    const { hides, exposes, defaults, replaces = {}, overrides = {}, props } = component;
    const actualProps: Props = {};

    if (defaults) {
        for (const name in defaults) {
            if (!parentProps || !(name in parentProps)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with a default prop. Parent does not expose "${name}".`,
                );
            }
            actualProps[name] = exposeProp(
                project,
                context,
                component,
                parentProps[name],
                parentParams || {},
                { defaultValue: defaults[name].value },
            );
        }
    }

    if (hides && exposes) {
        project.addDiagnostic(
            component,
            `Could not extend a component with both "hides" and "exposes" strategies.`,
        );
    }

    if (hides && !exposes) {
        for (const name in hides) {
            if (!parentProps || !(name in parentProps)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with a hidden prop. Parent does not expose "${name}".`,
                );
            }
            // TODO store default value?
        }
        for (const name in parentProps) {
            if (!(name in hides) && !(name in replaces) && !(name in overrides)) {
                actualProps[name] = exposeProp(
                    project,
                    context,
                    component,
                    parentProps[name],
                    parentParams || {},
                );
            }
        }
    }

    if (!hides && exposes) {
        for (const name in exposes) {
            if (!parentProps || !(name in parentProps)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with a parent prop. Parent does not expose "${name}".`,
                );
            }
            actualProps[name] = exposeProp(
                project,
                context,
                component,
                parentProps[name],
                parentParams || {},
            );
        }
    }

    if (overrides) {
        for (const name in overrides) {
            if (!parentProps || !(name in parentProps)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop overrides. Parent does not expose "${name}".`,
                );
            } else if (isVariantInlineReferenceResource(parentProps[name])) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop overrides. Prop "${name}" is a reference.`,
                );
            } else {
                actualProps[name] = exposeProp(
                    project,
                    context,
                    component,
                    parentProps[name],
                    parentParams || {},
                    overrides[name],
                );
            }
        }
    }

    if (replaces) {
        for (const name in replaces) {
            if (!parentProps || !(name in parentProps)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop replaces. Parent does not expose "${name}".`,
                );
            } else if (isVariantInlineReferenceResource(parentProps[name])) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop replaces. Prop "${name}" is a reference.`,
                );
            } else {
                actualProps[name] = replaces[name];
            }
        }
    }

    if (props) {
        for (const name in props) {
            if (parentProps && name in parentProps) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with a new prop. Prop "${name}" is already inherited from parent, use "override" instead of "props".`,
                );
            } else {
                actualProps[name] = props[name];
            }
        }
    }

    return actualProps;
};

const resolveParent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): { parent: ComponentResource; params: ExtendParams } | undefined => {
    const { parent, params } = resolveExtendWithParams<ComponentResource>(component.extend);
    const componentExtends = isComponentExtendResource(parent);
    // TODO handle critical failure mode infinite recursion
    if (componentExtends) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const extended = extendComponent(project, context, componentExtends);
        if (!extended) {
            return undefined;
        }
        return {
            parent: extended,
            params,
        };
    }
    return { parent, params };
};

export const extendComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): ComponentOwnResource | undefined => {
    const { module, name, use } = component;

    const resolved = resolveParent(project, context, component);
    if (!resolved) {
        project.addDiagnostic(
            component,
            'Could not extend component because parent resolution failed.',
        );
        return;
    }

    const { parent, params } = resolved;
    const actualName = name || parent.name;
    if (!actualName) {
        project.addDiagnostic(component, 'No name');
        return;
    }

    const parentProps = resolveParentProps(project, context, component, parent, params);
    const actualProps = mergeProps(project, context, component, parentProps, params);
    const actualUses = (parent.use || []).concat(use || []);

    return {
        name: actualName,
        module,
        type: 'component',
        props: actualProps,
        use: actualUses,
    };
};
