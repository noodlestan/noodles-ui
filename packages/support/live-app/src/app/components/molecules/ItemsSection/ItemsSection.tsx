import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import {
    getDiagnosticByResourceType,
    getDiagnosticErrors,
    getDiagnosticWarnings,
} from '@noodles-ui/core-diagnostics';
import { EntityType, UnknownBuildContext, getEntitiesByType } from '@noodles-ui/core-entities';
import { Component, For, Show } from 'solid-js';

import { DiagnosticCounts } from '../../atoms/DiagnosticCounts';
import { EntityLink } from '../../atoms/EntityLink';
import { Icon } from '../../atoms/Icon';
import { Link } from '../../atoms/Link';
import { Plural } from '../../atoms/Plural';
import { SectionTitle } from '../../atoms/SectionTitle';
import { ENTITY_TYPE_ICONS } from '../../entities/ENTITY_TYPE_ICONS';
import { SectionLayout } from '../../layouts/SectionLayout';

import styles from './ItemsSection.module.scss';

type DiagnosticSourceItemProps = {
    snapshot?: BuildSnapshot;
    module?: string;
    type: EntityType;
    title: string;
    link: string;
};

export const ItemsSection: Component<DiagnosticSourceItemProps> = props => {
    const filter = (item: UnknownBuildContext) =>
        (!!props.module || item.context.public) &&
        (!props.module || item.entity.module === props.module);
    const entities = () => getEntitiesByType(props.snapshot, props.type, filter);
    const diagnostics = () => getDiagnosticByResourceType(props.type, props.snapshot?.diagnostics);
    const warnings = () => getDiagnosticWarnings(diagnostics());
    const errors = () => getDiagnosticErrors(diagnostics());

    const count = () => entities().length;
    const truncated = () => entities().splice(0, 5);
    const rest = () => entities().length - 5;
    const icon = () => ENTITY_TYPE_ICONS[props.type];

    return (
        <SectionLayout classList={{ [styles.ItemsSection]: true }}>
            <SectionTitle>
                <Icon icon={icon()} />
                <Link href={props.link}>{props.title}</Link>
                <Show when={count() > 0}>({count()})</Show>
                <div class={styles['ItemsSection--diagnostics']}>
                    <DiagnosticCounts warnings={warnings().length} errors={errors().length} mini />
                </div>
            </SectionTitle>
            <Show when={count() > 0}>
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
                </ul>
            </Show>
            <Show when={rest() > 0}>
                and{' '}
                <Link href={props.link}>
                    {rest()} more <Plural count={rest()}>{props.type}</Plural>
                </Link>
            </Show>
            <Show when={count() === 0}>
                <p>
                    No <Plural count={0}>{props.type}</Plural>
                </p>
            </Show>
        </SectionLayout>
    );
};
