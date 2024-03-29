import { Collapsible } from '@kobalte/core';
import { ChevronRight } from 'lucide-solid';
import { Component, JSX } from 'solid-js';

import { Icon } from '../../../atoms/Icon';

import styles from './CollapsibleTrigger.module.scss';

type CollapsibleTriggerProps = {
    children: JSX.Element;
};

export const CollapsibleTrigger: Component<CollapsibleTriggerProps> = props => {
    const classList = () => ({
        [styles.CollapsibleTrigger]: true,
    });

    return (
        <Collapsible.Trigger classList={classList()}>
            <Icon icon={ChevronRight} size="m" />
            {props.children}
        </Collapsible.Trigger>
    );
};
