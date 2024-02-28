import {
    ComponentExtendResource,
    ComponentOwnResource,
    ComponentResource,
    ProjectResource,
} from '@noodles-ui/core-types';

import { logInfo } from '../../cli/logInfo';
import { ComponentContext, ProjectContext } from '../../types/projects';

import { addComponent } from './addComponent';

const isComponentExtendResource = (
    component: ComponentResource,
): ComponentExtendResource | undefined => {
    if ((component as ComponentExtendResource).extend) {
        return component as ComponentExtendResource;
    }
};

const resolveParent = (component: ComponentResource): ComponentOwnResource | undefined => {
    const componentExtends = isComponentExtendResource(component);
    if (componentExtends) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return extendComponent(componentExtends);
    }
    return component as ComponentOwnResource;
};

export const extendComponent = (
    component: ComponentExtendResource,
): ComponentOwnResource | undefined => {
    const { extend, module, name, uses, defaults, hide, override, expose } = component;

    const parent = resolveParent(extend);
    if (!parent) {
        throw new Error('Failed to extend');
    }

    const actualName = name || parent.name;
    if (!actualName) {
        throw new Error();
    }

    console.info('* extending', component);
    console.info('* extending', component.extend);
    console.info('* extending (resolved)', parent);

    if (defaults) {
        for (const name in defaults) {
            console.log(' *-/*-/*- defaults', defaults[name]);
        }
    }
    if (hide) {
        for (const name in hide) {
            console.log(' *-/*-/*- hide', hide[name]);
        }
    }
    if (override) {
        for (const name in override) {
            console.log(' *-/*-/*- override', override[name]);
        }
    }
    if (expose) {
        for (const name in expose) {
            console.log(' *-/*-/*- expose', expose[name]);
        }
    }

    const actualUses = (parent.uses || []).concat(uses || []);

    // TODO override api
    const actualProps = parent.props;

    return {
        name: actualName,
        module,
        type: 'component',
        props: actualProps,
        uses: actualUses,
    };
};

export const loadComponentExtend = (
    project: ProjectContext,
    component: ComponentExtendResource,
    context: Omit<ComponentContext, 'meta'>,
): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    loadComponent(project, component.extend, { public: false });
    const extended = extendComponent(component);
    if (extended) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        loadComponent(project, extended, context);
    }
};

export const loadComponent = (
    project: ProjectContext,
    component: ComponentResource,
    context: Omit<ComponentContext, 'meta'>,
): void => {
    const componentExtend = isComponentExtendResource(component);
    if (componentExtend) {
        loadComponentExtend(project, componentExtend, context);
    } else {
        addComponent(project, component, context);
    }
};

export const loadComponents = (project: ProjectContext, meta: ProjectResource): void => {
    logInfo('loading components...');

    meta.components.forEach(component => {
        loadComponent(project, component, { public: true });
    });

    console.info('');
};
