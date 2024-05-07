import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import {
    getDiagnosticErrors,
    getDiagnosticWarnings,
    getResourceDiagnostics,
} from '@noodles-ui/core-diagnostics';
import { getSystem, getSystemComponentName } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { DiagnosticCounts } from '../../atoms/DiagnosticCounts';
import { Icon } from '../../atoms/Icon';
import { Link } from '../../atoms/Link';
import { SectionTitle } from '../../atoms/SectionTitle';
import { ENTITY_TYPE_ICONS } from '../../entities/ENTITY_TYPE_ICONS';
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
                <Icon icon={ENTITY_TYPE_ICONS.system} />
                System Root
                <div class={styles['SystemSection--diagnostics']}>
                    <DiagnosticCounts warnings={warnings().length} errors={errors().length} mini />
                </div>
            </SectionTitle>
            <div class={styles['SystemSection--details']}>
                <div>
                    <h4>Component:</h4>
                    &lt;{getSystemComponentName(props.snapshot as BuildSnapshot)} /&gt;
                </div>
                <div>
                    <h4>Use surfaces:</h4>
                    {system()?.entity.surface ? 'yes' : 'no'}
                </div>
            </div>
            <Link href="/system">See details</Link>
        </SectionLayout>
    );
};
