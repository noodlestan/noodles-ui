// import { Heading, Text } from '@noodles-ui/sandbox-ui';
import { ComponentContext, VariantContext } from '@noodles-ui/support-types';
import { Component, For } from 'solid-js';

import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { ComponentCard } from '../components/entities/component/ComponentCard/ComponentCard';
import { SurfaceCard } from '../components/entities/surface/SurfaceCard';
import { ThemeCard } from '../components/entities/theme/ThemeCard';
import { TokenCard } from '../components/entities/token/TokenCard';
import { VariantCard } from '../components/entities/variant/VariantCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { PageLayout } from '../components/layouts/PageLayout/PageLayout';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { useBuildContext } from '../providers/BuildContextProvider';

export const HomePage: Component = () => {
    const { entities } = useBuildContext();

    const { surfaces, themes, variants, components, tokens } = entities;

    const isPublicComponent = (component: ComponentContext) => !!component.public;
    const isPublicVariant = (variant: VariantContext) => !!variant.public;

    return (
        <PageLayout tag="main">
            <PageTitle>SandboxUI</PageTitle>
            <SectionLayout>
                <SectionTitle>Surfaces</SectionTitle>
                <CardGrid>
                    <For each={surfaces()}>{surface => <SurfaceCard surface={surface} />}</For>
                </CardGrid>
            </SectionLayout>
            <SectionLayout>
                <SectionTitle>Themes</SectionTitle>
                <CardGrid>
                    <For each={themes()}>{theme => <ThemeCard theme={theme} />}</For>
                </CardGrid>
            </SectionLayout>
            <SectionLayout>
                <SectionTitle>Components</SectionTitle>
                <CardGrid>
                    <For each={components().filter(isPublicComponent)}>
                        {component => <ComponentCard component={component} />}
                    </For>
                </CardGrid>
            </SectionLayout>
            <SectionLayout>
                <SectionTitle>Variants</SectionTitle>
                <CardGrid>
                    <For each={variants().filter(isPublicVariant)}>
                        {variant => <VariantCard variant={variant} />}
                    </For>
                </CardGrid>
            </SectionLayout>
            <SectionLayout>
                <SectionTitle>Tokens</SectionTitle>
                <CardGrid>
                    <For each={tokens()}>{token => <TokenCard token={token} />}</For>
                </CardGrid>
            </SectionLayout>
        </PageLayout>
    );
};
