import {
    ComponentExtendResource,
    ComponentOwnResource,
    ComponentResource,
} from '@noodles-ui/core-types';

import { ComponentContext, ProjectContext } from '../../../types/projects';
import { isVariantInlineReferenceResource } from '../../variants/private/isVariantInlineReferenceResource';
import { resolveResourceParent } from '../resolveResourceParent';

import { isComponentExtendResource } from './isComponentExtendResource';

const resolveParent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): ComponentOwnResource | undefined => {
    const { parent } = resolveResourceParent<ComponentResource>(component);
    const componentExtends = isComponentExtendResource(parent);
    // TODO handle critical failure mode infinite recursion
    if (componentExtends) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return extendComponent(project, context, componentExtends /*, params */);
    }
    return parent as ComponentOwnResource;
};

// TODO breakdown

export const extendComponent = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentExtendResource,
): ComponentOwnResource | undefined => {
    const { module, name, uses, defaults, hides, overrides, props } = component;

    const parent = resolveParent(project, context, component);
    if (!parent) {
        project.addDiagnostic(component, 'Could not extend. Could not resolve parent.');
        return;
    }

    const actualName = name || parent.name;
    if (!actualName) {
        project.addDiagnostic(component, 'No name');
        return;
    }

    const actualProps = structuredClone(parent.props || {});

    if (defaults) {
        for (const name in defaults) {
            if (!parent.props || !(name in parent.props)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with a default prop. Parent does not expose "${name}".`,
                );
            }
            delete actualProps[name];
        }
    }
    if (hides) {
        for (const name in hides) {
            if (!parent.props || !(name in parent.props)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with a hidden prop. Parent does not expose "${name}".`,
                );
            }
            delete actualProps[name];
        }
    }
    if (overrides) {
        for (const name in overrides) {
            if (!parent.props || !(name in parent.props)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop overrides. Parent does not expose "${name}".`,
                );
            } else if (isVariantInlineReferenceResource(parent.props[name])) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop overrides. Prop "${name}" is a reference.`,
                );
            } else {
                // TODO how are props/variants overriden?
                actualProps[name] = Object.assign({}, actualProps[name], overrides[name]);
            }
        }
    }
    if (props) {
        for (const name in props) {
            if (parent.props && name in parent.props) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with a new prop. Parent already exposes "${name}", use "override" instead of "props".`,
                );
            } else {
                actualProps[name] = props[name];
            }
        }
    }

    const actualUses = (parent.uses || []).concat(uses || []);

    return {
        name: actualName,
        module,
        type: 'component',
        props: actualProps,
        uses: actualUses,
    };
};
