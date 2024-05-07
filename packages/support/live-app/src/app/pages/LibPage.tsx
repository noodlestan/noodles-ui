import { useNavigate, useParams } from '@solidjs/router';
import { PackageIcon } from 'lucide-solid';
import { Component, Show, createEffect } from 'solid-js';

import { Icon } from '../components/atoms/Icon';
import { PageHeader } from '../components/atoms/PageHeader';
import { PageTitle } from '../components/atoms/PageTitle';
import { DashboardGrid } from '../components/layouts/DashboardGrid';
import { StageLayout } from '../components/layouts/StageLayout';
import { ItemsSection } from '../components/molecules/ItemsSection/ItemsSection';
import { PageCrumbs } from '../components/molecules/PageCrumbs';
import { useSnapshotContext } from '../providers/SnapshotContextProvider';

export const LibPage: Component = () => {
    const { lastSnapshot } = useSnapshotContext();

    const params = useParams();

    const hasModule = () => !!params.module;
    const module = () => params.module;
    const link = (base: string) => `/${base}/${module()}`;

    const navigate = useNavigate();
    createEffect(() => {
        if (!hasModule()) {
            navigate('/nui', { replace: true });
        }
    });

    return (
        <Show when={lastSnapshot()}>
            <PageCrumbs project={lastSnapshot()?.project} module={module()} />
            <StageLayout tag="main">
                <PageHeader>
                    <PageTitle>
                        <Icon size="m" icon={PackageIcon} /> {module()}
                    </PageTitle>
                </PageHeader>
                <DashboardGrid>
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="mixin"
                        title="Mixins"
                        link={link('mixins')}
                        module={module()}
                    />
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="variant"
                        title="Variants"
                        link={link('variants')}
                        module={module()}
                    />
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="component"
                        title="Components"
                        link={link('components')}
                        module={module()}
                    />
                    <ItemsSection
                        snapshot={lastSnapshot()}
                        type="token"
                        title="Tokens"
                        link={link('tokens')}
                        module={module()}
                    />
                </DashboardGrid>
            </StageLayout>
        </Show>
    );
};
