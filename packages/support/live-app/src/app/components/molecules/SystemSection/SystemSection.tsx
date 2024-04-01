import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import {
    getDiagnosticErrors,
    getDiagnosticWarnings,
    getResourceDiagnostics,
} from '@noodles-ui/core-diagnostics';
import { getSystem, getSystemComponentName } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { DiagnosticCounts } from '../../atoms/DiagnosticCounts';
import { Link } from '../../atoms/Link';
import { SectionTitle } from '../../atoms/SectionTitle';
import { SectionLayout } from '../../layouts/SectionLayout';

import styles from './SystemSection.module.scss';

type DiagnosticSourceItemProps = {
    snapshot?: BuildSnapshot;
};

export const SystemSection: Component<DiagnosticSourceItemProps> = props => {
    const system = () => getSystem(props.snapshot);
    const diagnostics = () => getResourceDiagnostics(system().entity, props.snapshot?.diagnostics);
    const warnings = () => getDiagnosticWarnings(diagnostics());
    const errors = () => getDiagnosticErrors(diagnostics());

    return (
        <SectionLayout classList={{ [styles.SystemSection]: true }}>
            <SectionTitle>
                <Link href="/system">System Root</Link>
                <div class={styles['SystemSection--diagnostics']}>
                    <DiagnosticCounts warnings={warnings().length} errors={errors().length} mini />
                </div>
            </SectionTitle>
            <div class={styles['SystemSection--details']}>
                {getSystemComponentName(props.snapshot as BuildSnapshot)}
            </div>
            <Link href="/system">See details</Link>
        </SectionLayout>
    );
};
