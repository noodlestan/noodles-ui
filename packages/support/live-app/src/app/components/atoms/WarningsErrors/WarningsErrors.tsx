import { OctagonAlertIcon, TriangleAlert } from 'lucide-solid';
import { Component, Show } from 'solid-js';

import { Icon } from '../Icon';
import { Plural } from '../Plural';

import styles from './WarningsErrors.module.scss';

type WarningsErrorsProps = {
    mini?: boolean;
    warnings: number;
    errors: number;
};

export const WarningsErrors: Component<WarningsErrorsProps> = props => {
    const classList = () => ({
        [styles.WarningsErrors]: true,
        [styles['WarningsErrors-has-warnings']]: props.warnings > 0,
        [styles['WarningsErrors-has-errors']]: props.errors > 0,
    });

    return (
        <Show when={props.warnings || props.errors}>
            <p classList={classList()}>
                <Show when={props.warnings}>
                    <span class={styles['WarningsErrors--warnings']}>
                        <Show when={props.mini}>
                            <Icon size="s" icon={TriangleAlert} />
                        </Show>
                        {props.warnings}{' '}
                        <Show when={!props.mini}>
                            <Plural count={props.warnings}>warning</Plural>
                        </Show>
                    </span>
                </Show>
                <Show when={props.errors && props.warnings}>
                    <span class={styles['WarningsErrors--slash']}>/</span>
                </Show>
                <Show when={props.errors}>
                    <span class={styles['WarningsErrors--errors']}>
                        <Show when={props.mini}>
                            <Icon size="s" icon={OctagonAlertIcon} />
                        </Show>
                        {props.errors}{' '}
                        <Show when={!props.mini}>
                            <Plural count={props.errors}>error</Plural>
                        </Show>
                    </span>
                </Show>
            </p>
        </Show>
    );
};
