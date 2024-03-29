import {
    ProjectDiagnostic,
    getAllDiagnosticSourceKeys,
    getDiagnosticErrors,
    getDiagnosticWarnings,
    hasDiagnostics,
} from '@noodles-ui/support-types';
import { Component, Show } from 'solid-js';

import { DiagnosticCounts } from '../../atoms/DiagnosticCounts';
import { Link } from '../../atoms/Link';
import { Plural } from '../../atoms/Plural';
import { SectionTitle } from '../../atoms/SectionTitle';
import { SectionLayout } from '../../layouts/SectionLayout';

import styles from './DiagnosticsBanner.module.scss';

type DiagnosticSourceItemProps = {
    diagnostics?: ProjectDiagnostic[];
    onItem?: boolean;
    noLink?: boolean;
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
                    <DiagnosticCounts warnings={warnings().length} errors={errors().length} />
                    <div class={styles['DiagnosticsBanner--items']}>
                        <Show when={!props.onItem}>
                            in {items().length} <Plural count={items().length}>item</Plural>
                        </Show>
                        <Show when={props.onItem}>in this item</Show>
                    </div>
                </div>
                <Show when={!props.noLink && !props.onItem}>
                    <Link href="/diagnostics">See all diagnostics</Link>
                </Show>
            </SectionLayout>
        </Show>
    );
};
