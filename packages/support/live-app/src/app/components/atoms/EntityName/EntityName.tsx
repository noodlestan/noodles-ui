import { EntityType } from '@noodles-ui/core-entities';
import { Component, JSX, Show } from 'solid-js';

import { ENTITY_TYPE_ICONS } from '../../entities/ENTITY_TYPE_ICONS';
import { Icon } from '../Icon';

import styles from './EntityName.module.css';

type EntityNameProps = {
    small?: boolean;
    type?: EntityType;
    children: JSX.Element;
};

export const EntityName: Component<EntityNameProps> = props => {
    const classList = () => ({
        [styles.EntityName]: true,
        [styles['EntityName-small']]: props.small,
    });

    return (
        <p classList={classList()}>
            <Show when={props.type}>
                <Icon size="s" icon={ENTITY_TYPE_ICONS[props.type as EntityType]} />
            </Show>
            {props.children}
        </p>
    );
};
