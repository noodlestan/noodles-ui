import {
    BuildSnapshotDto,
    getItemsWithErrors,
    getItemsWithWarnings,
} from '@noodles-ui/support-types';
import { Component } from 'solid-js';

import { EntityKeyLink } from '../../atoms/EntityKeyLink';
import { WarningsErrors } from '../../atoms/WarningsErrors';

import styles from './DiagnosticSourceItem.module.scss';

type DiagnosticSourceItemProps = {
    snapshot?: BuildSnapshotDto;
    sourceKey: string;
};

export const DiagnosticSourceItem: Component<DiagnosticSourceItemProps> = props => {
    const itemsWithWarnings = () => getItemsWithWarnings(props.snapshot?.diagnostics);
    const itemsWithErrors = () => getItemsWithErrors(props.snapshot?.diagnostics);

    const warnCount = () => itemsWithWarnings()[props.sourceKey] || 0;
    const errorCount = () => itemsWithErrors()[props.sourceKey] || 0;

    const classList = () => ({
        [styles.DiagnosticSourceItem]: true,
    });

    return (
        <li classList={classList()}>
            <EntityKeyLink key={props.sourceKey} />
            <WarningsErrors warnings={warnCount()} errors={errorCount()} />
        </li>
    );
};
