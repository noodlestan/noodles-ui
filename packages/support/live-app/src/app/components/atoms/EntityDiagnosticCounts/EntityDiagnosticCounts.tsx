import { BuildSnapshot } from '@noodles-ui/core-compiler-types';
import { getResourceErrors, getResourceWarnings } from '@noodles-ui/core-diagnostics';
import { UnknownBuildContext } from '@noodles-ui/core-entities';
import { Component } from 'solid-js';

import { DiagnosticCounts } from '../DiagnosticCounts';

type ThemeCardProps = {
    snapshot: BuildSnapshot;
    context: UnknownBuildContext;
};

export const EntityDiagnosticCounts: Component<ThemeCardProps> = props => {
    const errors = () => getResourceErrors(props.context.entity, props.snapshot.diagnostics);
    const warnings = () => getResourceWarnings(props.context.entity, props.snapshot.diagnostics);

    return <DiagnosticCounts warnings={warnings().length} errors={errors().length} mini />;
};
