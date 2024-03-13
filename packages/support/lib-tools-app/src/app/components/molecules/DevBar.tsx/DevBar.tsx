import { Component, Show } from 'solid-js';

import { useBuildContext } from '../../../providers/BuildContextProvider';
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
            <Show when={error()}>
                <p>{error()?.message}</p>
            </Show>
            <Show when={!error()}>
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
                    <button onClick={requestBuild}>{lastBuild() ? 'rebuild' : 'build'}</button>
                </Show>
            </Show>
        </div>
    );
};
