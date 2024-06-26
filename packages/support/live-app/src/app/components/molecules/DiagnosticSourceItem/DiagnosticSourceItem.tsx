import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getItemsWithErrors, getItemsWithWarnings } from '@noodles-ui/core-diagnostics';
import { Component } from 'solid-js';

import { DiagnosticCounts } from '../../atoms/DiagnosticCounts';
import { EntityKeyLink } from '../../atoms/EntityKeyLink';

import styles from './DiagnosticSourceItem.module.scss';

type DiagnosticSourceItemProps = {
    snapshot?: BuildSnapshot;
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
            <DiagnosticCounts warnings={warnCount()} errors={errorCount()} />
        </li>
    );
};
