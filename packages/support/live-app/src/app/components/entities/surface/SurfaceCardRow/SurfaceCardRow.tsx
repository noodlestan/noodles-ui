import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { SurfaceBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { SurfaceCard } from '../SurfaceCard';
import { SurfaceRenderer } from '../SurfaceRenderer/SurfaceRenderer';

import styles from './SurfaceCardRow.module.css';

type SurfaceCardRowProps = {
    snapshot: BuildSnapshot;
    surface: SurfaceBuildContext;
};

export const SurfaceCardRow: Component<SurfaceCardRowProps> = props => {
    const classList = () => ({
        [styles.SurfaceCardRow]: true,
    });

    return (
        <div classList={classList()}>
            <SurfaceCard snapshot={props.snapshot} surface={props.surface} />
            <SurfaceRenderer surface={props.surface} />
        </div>
    );
};
