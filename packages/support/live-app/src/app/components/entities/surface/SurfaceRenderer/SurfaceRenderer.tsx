import { SurfaceBuildContext } from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';
import { Component } from 'solid-js';

import { Renderer } from '../../../atoms/Renderer/Renderer';

import styles from './SurfaceRenderer.module.scss';

type SurfaceRendererProps = {
    surface: SurfaceBuildContext;
};

export const SurfaceRenderer: Component<SurfaceRendererProps> = props => {
    const path = () => getResourceKey(props.surface.entity).replace(':', '/');

    const classList = () => ({
        [styles.SurfaceRenderer]: true,
    });

    return (
        <div classList={classList()}>
            <Renderer src={`http://localhost:3133/surface/${path()}`} />
        </div>
    );
};
