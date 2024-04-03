import { SurfaceBuildContext } from '@noodles-ui/core-entities';
import { getResourceKey } from '@noodles-ui/core-resources';
import { Component } from 'solid-js';

import styles from './SurfaceRenderer.module.scss';

type EntityDiagnosticsProps = {
    surface: SurfaceBuildContext;
};

export const SurfaceRenderer: Component<EntityDiagnosticsProps> = props => {
    const path = () => getResourceKey(props.surface.entity).replace(':', '/');

    const classList = () => ({
        [styles.SurfaceRenderer]: true,
    });

    return (
        <div classList={classList()}>
            <iframe src={`http://localhost:3133/surface/${path()}`} />
        </div>
    );
};
