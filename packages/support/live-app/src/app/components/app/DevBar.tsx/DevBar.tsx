import { Component, Show } from 'solid-js';

import { useBuildContext } from '../../../providers/BuildContextProvider';
import { Button } from '../../atoms/Button';
import { TimeAgo } from '../../atoms/TimeAgo/TimeAgo';
import { TimeElapsed } from '../../atoms/TimeElapsed/TimeElapsed';

import styles from './DevBar.module.scss';

export const DevBar: Component = () => {
    const { builds, error, isBuilding, requestBuild } = useBuildContext();

    const lastBuild = () => {
        const items = builds();
        if (!items.length) {
            return;
        }
        return items[items.length - 1];
    };

    const isLoading = () => !lastBuild();
    const isSuccess = () => !!lastBuild()?.build.success;
    const timestamp = () => lastBuild()?.build.timestamp;

    const classList = () => ({
        [styles.DevBar]: true,
        [styles['DevBar-has-build']]: !!lastBuild(),
        [styles['DevBar-is-building']]: !!isBuilding(),
        [styles['DevBar-is-success']]: isSuccess(),
        [styles['DevBar-has-error']]: !!error(),
    });

    return (
        <div classList={classList()}>
            <Show when={isLoading()}>
                <span> </span>
            </Show>
            <Show when={error()}>
                <p>{error()?.message}</p>
            </Show>
            <Show when={!error() && !isLoading()}>
                <div>NUI</div>
                <Show when={isBuilding()}>
                    <div>
                        building ... <TimeElapsed date={isBuilding() as Date} />
                    </div>
                </Show>
                <Show when={!isBuilding() && lastBuild()}>
                    <div class={styles['DevBar--Outcome']}>{isSuccess() ? 'Success' : 'Fail'}</div>
                    <div>{timestamp() ? <TimeAgo date={timestamp()} /> : 'x,x'}</div>
                </Show>
                <Show when={!isBuilding()}>
                    <div>
                        <Button onClick={requestBuild}>{lastBuild() ? 'rebuild' : 'build'}</Button>
                    </div>
                </Show>
            </Show>
        </div>
    );
};
