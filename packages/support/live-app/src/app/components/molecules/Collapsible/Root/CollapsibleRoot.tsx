import { Collapsible } from '@kobalte/core';
import { Component, JSX } from 'solid-js';

import styles from './CollapsibleRoot.module.scss';

type CollapsibleRootProps = {
    children: JSX.Element;
};

export const CollapsibleRoot: Component<CollapsibleRootProps> = props => {
    const classList = () => ({
        [styles.CollapsibleRoot]: true,
    });

    return <Collapsible.Root classList={classList()}>{props.children}</Collapsible.Root>;
};
