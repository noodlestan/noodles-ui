import { ComponentBuildContext, ComponentImportEntity } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import styles from './ComponentImport.module.scss';

type ComponentImportrops = {
    component: ComponentBuildContext;
};

export const ComponentImport: Component<ComponentImportrops> = props => {
    const entity = () => props.component.entity as ComponentImportEntity;
    const name = () => entity().name;
    const pkg = () => entity().package || entity().module;
    const code = () => `import { ${name()} } from ${pkg()}`;

    const classList = () => ({
        [styles.ComponentImport]: true,
    });

    return (
        <div classList={classList()}>
            <code>{code()}</code>
        </div>
    );
};
