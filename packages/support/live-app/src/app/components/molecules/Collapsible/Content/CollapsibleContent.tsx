import { Collapsible } from '@kobalte/core';
import { Component, JSX } from 'solid-js';

import styles from './CollapsibleContent.module.scss';

type CollapsibleContentProps = {
    children: JSX.Element;
};

export const CollapsibleContent: Component<CollapsibleContentProps> = props => {
    const classList = () => ({
        [styles.CollapsibleContent]: true,
    });

    return <Collapsible.Content classList={classList()}>{props.children}</Collapsible.Content>;
};
