import { ProjectDiagnostic } from '@noodles-ui/support-types';
// import { OctagonAlert, TriangleAlert } from 'lucide-solid';
import { Component } from 'solid-js';

// import { Icon } from '../../atoms/Icon';

import styles from './DiagnosticItem.module.scss';

type DiagnosticSourceItemProps = {
    item: ProjectDiagnostic;
    onItem?: boolean;
};

export const DiagnosticItem: Component<DiagnosticSourceItemProps> = props => {
    const isWarning = () => props.item.severity === 'warning';
    const isError = () => props.item.severity === 'error';
    // const icon = () => (isError() ? OctagonAlert : TriangleAlert);

    const classList = () => ({
        [styles.DiagnosticItem]: true,
        [styles['DiagnosticItem-is-warning']]: isWarning(),
        [styles['DiagnosticItem-is-error']]: isError(),
    });

    return <div classList={classList()}>{props.item.message}</div>;
};
