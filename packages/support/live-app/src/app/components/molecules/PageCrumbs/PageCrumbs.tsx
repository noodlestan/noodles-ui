import { UnknownEntity } from '@noodles-ui/core-entities';
import { ProjectResource } from '@noodles-ui/core-resources';
import { PackageIcon } from 'lucide-solid';
import { Component, Show } from 'solid-js';

import { Icon } from '../../atoms/Icon';
import { Link } from '../../atoms/Link';
import { ModuleName } from '../../atoms/ModuleName';

import styles from './PageCrumbs.module.scss';

type PageCrumbsProps = {
    project?: ProjectResource;
    module?: string;
    entity?: UnknownEntity;
    isList?: boolean;
};

export const PageCrumbs: Component<PageCrumbsProps> = props => {
    const isHome = () => props.project && !props.module && !props.isList && !props.entity;
    const module = () => props.module || props.entity?.module;
    const isExternalModule = () => module() !== props.project?.module;

    const classList = () => ({
        [styles.PageCrumbs]: true,
    });

    return (
        <div classList={classList()}>
            <Show when={isHome()}>
                <ModuleName>{props.project?.module}</ModuleName>
            </Show>
            <Show when={props.project && (props.module || props.entity)}>
                <Link href={`/nui`}>
                    <ModuleName>{props.project?.module}</ModuleName>
                </Link>
            </Show>
            <Show when={module() && isExternalModule()}>
                / <Icon size="s" icon={PackageIcon} />
                <Show when={!props.entity && !props.isList}>
                    <ModuleName>{module()}</ModuleName>{' '}
                </Show>
                <Show when={props.entity || props.isList}>
                    <Link href={`/lib/${module()}`}>
                        <ModuleName>{module()}</ModuleName>
                    </Link>{' '}
                </Show>
            </Show>
            <Show when={props.entity}>
                <Show when={props.entity?.type !== 'system'}>
                    /{' '}
                    <Link href={`/${props.entity?.type}s/${props.entity?.module}`}>
                        {props.entity?.type}s
                    </Link>
                </Show>
                <Show when={props.entity?.type === 'system'}>/ System root</Show>
            </Show>
        </div>
    );
};
