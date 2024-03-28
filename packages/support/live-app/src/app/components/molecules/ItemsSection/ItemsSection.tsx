import {
    BuildSnapshotDto,
    EntitiesMapDto,
    getDiagnosticByResourcetype,
    getDiagnosticErrors,
    getDiagnosticWarnings,
} from '@noodles-ui/support-types';
import { Component, For, Show } from 'solid-js';

import { EntityLink } from '../../atoms/EntityLink';
import { Link } from '../../atoms/Link';
import { Plural } from '../../atoms/Plural';
import { SectionTitle } from '../../atoms/SectionTitle';
import { WarningsErrors } from '../../atoms/WarningsErrors';
import { SectionLayout } from '../../layouts/SectionLayout';

import styles from './ItemsSection.module.scss';

type DiagnosticSourceItemProps = {
    snapshot?: BuildSnapshotDto;
    type: keyof EntitiesMapDto;
    title: string;
    link: string;
};

export const ItemsSection: Component<DiagnosticSourceItemProps> = props => {
    const entries = () => Object.entries(props.snapshot?.entities[props.type] || {});
    const diagnostics = () => getDiagnosticByResourcetype(props.type, props.snapshot?.diagnostics);
    const warnings = () => getDiagnosticWarnings(diagnostics());
    const errors = () => getDiagnosticErrors(diagnostics());

    const truncated = () => entries().splice(0, 5);
    const rest = () => entries().length - 5;
    return (
        <SectionLayout classList={{ [styles.ItemsSection]: true }}>
            <SectionTitle>
                {props.title} ({entries().length})
                <div class={styles['ItemsSection--details']}>
                    <WarningsErrors warnings={warnings().length} errors={errors().length} mini />
                </div>
            </SectionTitle>
            <ul class={styles['ItemsSection--items']}>
                <For each={truncated()}>
                    {(entry, index) => {
                        return (
                            <li>
                                <EntityLink entity={entry[1].entity} />
                                <Show when={index() < truncated().length - 1}>
                                    <span>,</span>{' '}
                                </Show>
                            </li>
                        );
                    }}
                </For>
                <Show when={rest() > 0}>
                    and {rest()} <Plural count={rest()}>{props.type}</Plural> more
                </Show>
            </ul>
            <Link href={props.link}>See all</Link>
        </SectionLayout>
    );
};
