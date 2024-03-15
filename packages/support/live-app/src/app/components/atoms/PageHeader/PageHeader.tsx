import { Component, JSX } from 'solid-js';

import { Link } from '../Link';

import styles from './PageHeader.module.css';

type PageHeaderProps = {
    children: JSX.Element;
    classList?: { [key: string]: boolean };
};

export const PageHeader: Component<PageHeaderProps> = props => {
    const classList = () => ({
        [styles.PageHeader]: true,
    });

    return (
        <div classList={classList()}>
            <div>{props.children}</div>
            <Link href="/">X</Link>
        </div>
    );
};
