import {
    ProjectDiagnostic,
    getAllDiagnosticSourceKeys,
    getDiagnosticErrors,
    getDiagnosticWarnings,
    hasDiagnostics,
} from '@noodles-ui/support-types';
import { Component, Show } from 'solid-js';

import { Link } from '../../atoms/Link';
import { Plural } from '../../atoms/Plural';
import { SectionTitle } from '../../atoms/SectionTitle';
import { WarningsErrors } from '../../atoms/WarningsErrors';
import { SectionLayout } from '../../layouts/SectionLayout';

import styles from './DiagnosticsBanner.module.scss';

type DiagnosticSourceItemProps = {
    diagnostics?: ProjectDiagnostic[];
};

export const DiagnosticsBanner: Component<DiagnosticSourceItemProps> = props => {
    const show = () => hasDiagnostics(props.diagnostics);
    const warnings = () => getDiagnosticWarnings(props.diagnostics);
    const errors = () => getDiagnosticErrors(props.diagnostics);
    const items = () => getAllDiagnosticSourceKeys(props.diagnostics);

    const classList = () => ({
        [styles.DiagnosticsBanner]: true,
        [styles['DiagnosticsBanner-has-warnings']]: warnings().length > 0,
        [styles['DiagnosticsBanner-has-errors']]: errors().length > 0,
    });

    return (
        <Show when={show()}>
            <SectionLayout classList={classList()}>
                <SectionTitle>Diagnostics</SectionTitle>
                <div class={styles['DiagnosticsBanner--details']}>
                    <WarningsErrors warnings={warnings().length} errors={errors().length} />
                    <div class={styles['DiagnosticsBanner--items']}>
                        in {items().length} <Plural count={items().length}>item</Plural>
                    </div>
                </div>
                <Link href="/diagnostics">See all diagnostics</Link>
            </SectionLayout>
        </Show>
    );
};
