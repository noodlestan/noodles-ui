import {
    BuildSnapshot,
    EntityType,
    getDiagnosticByResourcetype,
    getDiagnosticErrors,
    getDiagnosticWarnings,
} from '@noodles-ui/support-types';
import { Component, For, Show } from 'solid-js';

import { entitiesByType } from '../../../providers/SnapshotContextProvider/entitiesByType';
import { DiagnosticCounts } from '../../atoms/DiagnosticCounts';
import { EntityLink } from '../../atoms/EntityLink';
import { Link } from '../../atoms/Link';
import { Plural } from '../../atoms/Plural';
import { SectionTitle } from '../../atoms/SectionTitle';
import { SectionLayout } from '../../layouts/SectionLayout';

import styles from './ItemsSection.module.scss';

type DiagnosticSourceItemProps = {
    snapshot?: BuildSnapshot;
    type: EntityType;
    title: string;
    link: string;
};

export const ItemsSection: Component<DiagnosticSourceItemProps> = props => {
    const entities = () => entitiesByType(props.snapshot, props.type, item => item.context.public);
    const diagnostics = () => getDiagnosticByResourcetype(props.type, props.snapshot?.diagnostics);
    const warnings = () => getDiagnosticWarnings(diagnostics());
    const errors = () => getDiagnosticErrors(diagnostics());

    const truncated = () => entities().splice(0, 5);
    const rest = () => entities().length - 5;
    return (
        <SectionLayout classList={{ [styles.ItemsSection]: true }}>
            <SectionTitle>
                <Link href={props.link}>{props.title}</Link> ({entities().length})
                <div class={styles['ItemsSection--details']}>
                    <DiagnosticCounts warnings={warnings().length} errors={errors().length} mini />
                </div>
            </SectionTitle>
            <ul class={styles['ItemsSection--items']}>
                <For each={truncated()}>
                    {(entry, index) => {
                        return (
                            <li>
                                <EntityLink entity={entry.entity} />
                                <Show when={index() < truncated().length - 1}>
                                    <span>,</span>{' '}
                                </Show>
                            </li>
                        );
                    }}
                </For>
                <Show when={rest() > 0}>
                    and {rest()} more <Plural count={rest()}>{props.type}</Plural>
                </Show>
            </ul>
            <Link href={props.link}>See all</Link>
        </SectionLayout>
    );
};
