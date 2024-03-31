import { ProjectDiagnostic } from '@noodles-ui/core-diagnostics';
import { Component, Show } from 'solid-js';

import { Collapsible } from '../Collapsible';
import { DiagnosticsBanner } from '../DiagnosticsBanner/DiagnosticsBanner';
import { DiagnosticsList } from '../DiagnosticsList/DiagnosticsList';

type EntityDiagnosticsProps = {
    diagnostics: ProjectDiagnostic[];
};

export const EntityDiagnostics: Component<EntityDiagnosticsProps> = props => {
    return (
        <Show when={props.diagnostics.length}>
            <Collapsible.Root>
                <Collapsible.Trigger>
                    <DiagnosticsBanner diagnostics={props.diagnostics} onItem />
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <DiagnosticsList diagnostics={props.diagnostics} />
                </Collapsible.Content>
            </Collapsible.Root>
        </Show>
    );
};
