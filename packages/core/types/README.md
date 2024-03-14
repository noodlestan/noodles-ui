# Noodles UI / Core Types

> Types for modeling design systems

Early days. See [root README](../../../README.md) for an introduction.

## Concern

Provide core domain types consistently across all systems.

Some runtime code, such as [@noodles-ui/core-services](../types/README.md), reference types such as `Themes`, `ColourSchemeName`, or `Surface`.

Resource types are consumed in:

- resource files, e.g.: [Surface.nui.ts](../../core/styled/src/components/Surface/Surface.nui.ts)
- backend tooling code, such as [@noodles-ui/lib-tools](../../support/lib-tools/README.md)
- instrumentation and analytics
- documentation and visualization code

### Resource types

Declare and describe design system resources and their relationships across multiple packages.

Examples: `ThemeResource`, `ComponentResource`, and `VariantResource`.

Always named `AbcdefResource`.

> IMPORTANT: Code that ships to clients in production is forbidden to reference these types.
> (except for run-time instrumentation code).

### Elemental types

Primitives that are shared by both run-time code and tooling code

Examples: `TokenMap` and `ColourSchemeName`

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
