import { getDiagnosticErrors, getDiagnosticWarnings } from '@noodles-ui/support-types';
import { Component, Show } from 'solid-js';

import { useBuildContext } from '../../../providers/BuildContextProvider';
import { Button } from '../../atoms/Button';
import { TimeAgo } from '../../atoms/TimeAgo/TimeAgo';
import { TimeElapsed } from '../../atoms/TimeElapsed/TimeElapsed';
import { WarningsErrors } from '../../atoms/WarningsErrors';

import styles from './DevBarTools.module.scss';

export const DevBarTools: Component = () => {
    const { lastSnapshot, error, isBuilding, requestBuild } = useBuildContext();

    const errors = () => getDiagnosticErrors(lastSnapshot()?.diagnostics);
    const warnings = () => getDiagnosticWarnings(lastSnapshot()?.diagnostics);

    const isSuccess = () => !!lastSnapshot()?.success;
    const timestamp = () => lastSnapshot()?.timestamp;

    const classList = () => ({
        [styles.DevBarTools]: true,
        [styles['DevBarTools-has-build']]: !!lastSnapshot(),
        [styles['DevBarTools-is-building']]: !!isBuilding(),
        [styles['DevBarTools-is-success']]: isSuccess(),
        [styles['DevBarTools-has-error']]: !!error(),
    });

    return (
        <div classList={classList()}>
            <Show when={isBuilding()}>
                <div>
                    building ... <TimeElapsed date={isBuilding() as Date} />
                </div>
            </Show>
            <Show when={!isBuilding()}>
                <Show when={lastSnapshot()}>
                    <div class={styles['DevBarTools--Snapshot']}>
                        <div class={styles['DevBarTools--Outcome']}>
                            {isSuccess() ? 'Success' : 'Fail'}
                        </div>
                        <div>{timestamp() ? <TimeAgo date={timestamp()} /> : 'x,x'}</div>
                    </div>
                    <a class={styles['DevBarTools--diagnostics']} href="/diagnostics">
                        <WarningsErrors warnings={warnings().length} errors={errors().length} />
                    </a>
                </Show>

                <div class={styles['DevBarTools--Actions']}>
                    <Button onClick={requestBuild}>{lastSnapshot() ? 'rebuild' : 'build'}</Button>
                </div>
            </Show>
        </div>
    );
};
