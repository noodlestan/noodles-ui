import { ComponentResource } from '@noodles-ui/core-types';
import { ComponentContext, ProjectContext } from '@noodles-ui/support-types';

import { isVariantInlineReferenceResource } from '../../../variants/isVariantInlineReferenceResource';
import { Props } from '../extendComponent';

import { exposeProp } from './exposeProp';

export const mergeProps = (
    project: ProjectContext,
    context: ComponentContext,
    component: ComponentResource,
    parentProps: Props,
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
                continue;
            }
            const prop = exposeProp(project, context, component, parentProps[name], {
                defaultValue: defaults[name].value,
            });
            if (prop) {
                actualProps[name] = prop;
            }
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
                continue;
            }
            // TODO store default value?
        }
        for (const name in parentProps) {
            if (!(name in hides) && !(name in replaces) && !(name in overrides)) {
                const prop = exposeProp(project, context, component, parentProps[name]);
                if (prop) {
                    actualProps[name] = prop;
                }
            }
        }
    }

    if (!hides && exposes) {
        if (exposes !== '*') {
            for (const name of exposes) {
                if (!parentProps || !(name in parentProps)) {
                    project.addDiagnostic(
                        component,
                        `Could not extend component with a parent prop. Parent does not expose "${name}".`,
                    );
                    continue;
                }
            }
        }

        for (const name in parentProps) {
            if (
                (exposes === '*' || exposes.includes(name)) &&
                !(name in replaces) &&
                !(name in overrides)
            ) {
                const prop = exposeProp(project, context, component, parentProps[name]);
                if (prop) {
                    actualProps[name] = prop;
                }
            }
        }
    }

    if (overrides) {
        for (const name in overrides) {
            if (!parentProps || !(name in parentProps)) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop overrides. Parent does not expose "${name}".`,
                );
                continue;
            }
            if (isVariantInlineReferenceResource(parentProps[name])) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop overrides. Prop "${name}" is a reference.`,
                );
                continue;
            }
            const prop = exposeProp(
                project,
                context,
                component,
                parentProps[name],
                overrides[name],
            );
            if (prop) {
                actualProps[name] = prop;
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
                continue;
            }

            if (isVariantInlineReferenceResource(parentProps[name])) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with prop replaces. Prop "${name}" is a reference.`,
                );
                continue;
            }
            actualProps[name] = replaces[name];
        }
    }

    if (props) {
        for (const name in props) {
            if (parentProps && name in parentProps) {
                project.addDiagnostic(
                    component,
                    `Could not extend component with a new prop. Prop "${name}" is already inherited from parent, use "override" instead of "props".`,
                );
                continue;
            }

            actualProps[name] = props[name];
        }
    }

    return actualProps;
};
