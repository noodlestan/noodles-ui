import { Component, Show } from 'solid-js';

import { useBuildContext } from '../../../providers/BuildContextProvider';
import { HomeLink } from '../../atoms/HomeLink';
import { DevBarTools } from '../DevBarTools';

import styles from './DevBar.module.scss';

export const DevBar: Component = () => {
    const { lastSnapshot, error, isBuilding } = useBuildContext();

    const isLoading = () => !lastSnapshot();
    const isSuccess = () => !!lastSnapshot()?.success;

    const classList = () => ({
        [styles.DevBar]: true,
        [styles['DevBar-has-build']]: !!lastSnapshot(),
        [styles['DevBar-is-building']]: !!isBuilding(),
        [styles['DevBar-is-success']]: isSuccess(),
        [styles['DevBar-has-error']]: !!error(),
    });

    return (
        <div classList={classList()}>
            <Show when={isLoading()}>
                <span> </span>
            </Show>
            <Show when={!isLoading()}>
                <HomeLink />
            </Show>
            <Show when={error()}>
                <p>{error()?.message}</p>
            </Show>
            <Show when={!error() && !isLoading()}>
                <DevBarTools />
            </Show>
        </div>
    );
};
