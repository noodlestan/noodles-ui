import {
    ProjectDiagnostic,
    getDiagnosticErrors,
    getDiagnosticWarnings,
} from '@noodles-ui/support-types';
import { OctagonAlert, TriangleAlert } from 'lucide-solid';
import { Component, For, Show } from 'solid-js';

import { Icon } from '../../atoms/Icon';
import { Link } from '../../atoms/Link';
import { SectionTitle } from '../../atoms/SectionTitle';
import { SectionLayout } from '../../layouts/SectionLayout';
import { DiagnosticItem } from '../DiagnosticItem/DiagnosticItem';

import styles from './DiagnosticsList.module.scss';

type DiagnosticsListProps = {
    diagnostics?: ProjectDiagnostic[];
    onItem?: boolean;
};

export const DiagnosticsList: Component<DiagnosticsListProps> = props => {
    const warnings = () => getDiagnosticWarnings(props.diagnostics);
    const errors = () => getDiagnosticErrors(props.diagnostics);

    const classList = () => ({
        [styles.DiagnosticsList]: true,
        [styles['DiagnosticsList-has-warnings']]: warnings().length > 0,
        [styles['DiagnosticsList-has-errors']]: errors().length > 0,
    });

    return (
        <div classList={classList()}>
            <Show when={errors().length}>
                <SectionLayout>
                    <SectionTitle>
                        <Icon icon={OctagonAlert} size="s" /> Errors
                    </SectionTitle>
                    <For each={errors()}>{error => <DiagnosticItem item={error} />}</For>
                </SectionLayout>
            </Show>
            <Show when={warnings().length}>
                <SectionLayout>
                    <SectionTitle>
                        <Icon icon={TriangleAlert} size="s" />
                        Warnings
                    </SectionTitle>
                    <For each={warnings()}>{warning => <DiagnosticItem item={warning} />}</For>
                </SectionLayout>
            </Show>
            <Link href="/diagnostics">See all diagnostics</Link>
        </div>
    );
};
