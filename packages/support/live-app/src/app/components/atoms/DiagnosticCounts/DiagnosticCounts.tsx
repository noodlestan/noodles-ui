import { OctagonAlert, TriangleAlert } from 'lucide-solid';
import { Component, Show } from 'solid-js';

import { Icon } from '../Icon';
import { Plural } from '../Plural';

import styles from './DiagnosticCounts.module.scss';

type DiagnosticCountsProps = {
    mini?: boolean;
    noIcons?: boolean;
    warnings: number;
    errors: number;
};

export const DiagnosticCounts: Component<DiagnosticCountsProps> = props => {
    const classList = () => ({
        [styles.DiagnosticCounts]: true,
        [styles['DiagnosticCounts-has-warnings']]: props.warnings > 0,
        [styles['DiagnosticCounts-has-errors']]: props.errors > 0,
    });

    return (
        <Show when={props.warnings || props.errors}>
            <p classList={classList()}>
                <Show when={props.errors}>
                    <span class={styles['DiagnosticCounts--errors']}>
                        <Show when={!props.noIcons}>
                            <Icon size="s" icon={OctagonAlert} />
                        </Show>
                        {props.errors}{' '}
                        <Show when={!props.mini}>
                            <span class={styles['DiagnosticCounts--label']}>
                                <Plural count={props.errors}>error</Plural>
                            </span>
                        </Show>
                    </span>
                </Show>
                <Show when={props.errors && props.warnings}>
                    <span class={styles['DiagnosticCounts--plus']}>+</span>
                </Show>
                <Show when={props.warnings}>
                    <span class={styles['DiagnosticCounts--warnings']}>
                        <Show when={!props.noIcons}>
                            <Icon size="s" icon={TriangleAlert} />
                        </Show>
                        {props.warnings}{' '}
                        <Show when={!props.mini}>
                            <span class={styles['DiagnosticCounts--label']}>
                                <Plural count={props.warnings}>warning</Plural>
                            </span>
                        </Show>
                    </span>
                </Show>
            </p>
        </Show>
    );
};
