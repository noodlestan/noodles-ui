import { Component } from 'solid-js';

import styles from './Renderer.module.scss';

type RendererProps = {
    src: string;
};

export const Renderer: Component<RendererProps> = props => {
    const classList = () => ({
        [styles.Renderer]: true,
    });

    return <iframe classList={classList()} src={props.src} />;
};
