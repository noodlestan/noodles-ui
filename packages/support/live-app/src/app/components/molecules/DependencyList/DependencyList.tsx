import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { Component, For } from 'solid-js';

import { ModuleLink } from '../../atoms/ModuleLink';

import styles from './DependencyList.module.scss';

type DependencyListProps = {
    snapshot: BuildSnapshot;
};

export const DependencyList: Component<DependencyListProps> = props => {
    const classList = () => ({
        [styles.DependencyList]: true,
    });

    return (
        <div classList={classList()}>
            <ul>
                <For each={props.snapshot.dependencies}>
                    {item => (
                        <li>
                            <ModuleLink module={item} />
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
};
