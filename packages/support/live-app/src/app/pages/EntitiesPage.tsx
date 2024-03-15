// import { Heading, Text } from '@noodles-ui/lab-ui';
import {
    ComponentContextWithInstance,
    VariantContextWithInstance,
} from '@noodles-ui/support-types';
import { Component, For } from 'solid-js';

import { PageTitle } from '../components/atoms/PageTitle/PageTitle';
import { SectionTitle } from '../components/atoms/SectionTitle';
import { ComponentCard } from '../components/entities/component/ComponentCard/ComponentCard';
import { SurfaceCard } from '../components/entities/surface/SurfaceCard';
import { ThemeCard } from '../components/entities/theme/ThemeCard';
import { TokenCard } from '../components/entities/token/TokenCard';
import { VariantCard } from '../components/entities/variant/VariantCard';
import { CardGrid } from '../components/layouts/CardGrid/CardGrid';
import { SectionLayout } from '../components/layouts/SectionLayout';
import { StageLayout } from '../components/layouts/StageLayout/StageLayout';
import { useBuildContext } from '../providers/BuildContextProvider';
import { components } from '../providers/BuildContextProvider/components';
import { surfaces } from '../providers/BuildContextProvider/surfaces';
import { themes } from '../providers/BuildContextProvider/themes';
import { tokens } from '../providers/BuildContextProvider/tokens';
import { variants } from '../providers/BuildContextProvider/variants';

export const EntitiesPage: Component = () => {
    const { lastSnapshot } = useBuildContext();

    const isPublicComponent = (component: ComponentContextWithInstance) => !!component.public;
    const isPublicVariant = (variant: VariantContextWithInstance) => !!variant.public;

    return (
        <StageLayout tag="main">
            <PageTitle>Lab UI</PageTitle>
            <SectionLayout>
                <SectionTitle>Surfaces</SectionTitle>
                <CardGrid>
                    <For each={surfaces(lastSnapshot())}>
                        {surface => <SurfaceCard surface={surface} />}
                    </For>
                </CardGrid>
            </SectionLayout>
            <SectionLayout>
                <SectionTitle>Themes</SectionTitle>
                <CardGrid>
                    <For each={themes(lastSnapshot())}>{theme => <ThemeCard theme={theme} />}</For>
                </CardGrid>
            </SectionLayout>
            <SectionLayout>
                <SectionTitle>Components</SectionTitle>
                <CardGrid>
                    <For each={components(lastSnapshot()).filter(isPublicComponent)}>
                        {component => <ComponentCard component={component} />}
                    </For>
                </CardGrid>
            </SectionLayout>
            <SectionLayout>
                <SectionTitle>Variants</SectionTitle>
                <CardGrid>
                    <For each={variants(lastSnapshot()).filter(isPublicVariant)}>
                        {variant => <VariantCard variant={variant} />}
                    </For>
                </CardGrid>
            </SectionLayout>
            <SectionLayout>
                <SectionTitle>Tokens</SectionTitle>
                <CardGrid>
                    <For each={tokens(lastSnapshot())}>{token => <TokenCard token={token} />}</For>
                </CardGrid>
            </SectionLayout>
        </StageLayout>
    );
};
