import { Component, Show } from 'solid-js';

import { useBuildContext } from '../../../providers/BuildContextProvider';
import { TimeAgo } from '../../atoms/TimeAgo/TimeAgo';
import { TimeElapsed } from '../../atoms/TimeElapsed/TimeElapsed';

import styles from './DevBar.module.scss';

export const DevBar: Component = () => {
    const { builds, error, isBuilding, requestBuild } = useBuildContext();

    function lastBuild() {
        const d = builds();
        if (!d.length) {
            return;
        }
        return d[d.length - 1];
    }

    const classList = () => ({
        [styles.DevBar]: true,
        [styles['DevBar-has-build']]: !!lastBuild(),
        [styles['DevBar-is-building']]: !!isBuilding(),
        [styles['DevBar-is-success']]: !!lastBuild()?.success,
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
                    <div class={styles['DevBar--Outcome']}>
                        {lastBuild()?.success ? 'Success' : 'Fail'}
                    </div>
                    <div>
                        {lastBuild()?.timestamp ? <TimeAgo date={lastBuild()?.timestamp} /> : 'x,x'}
                    </div>
                    <button onClick={requestBuild}>rebuild</button>
                </Show>
            </Show>
        </div>
    );
};
