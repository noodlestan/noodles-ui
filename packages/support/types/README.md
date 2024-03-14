# Noodles UI / Support Types

> Types to support the design system build tools

Early days. See [root README](../../../README.md) for an introduction.

## Concern

Provide core domain types consistently across all systems.

Some runtime code, such as [@noodles-ui/core-services](../types/README.md), reference types such as `Themes`, `ColourSchemeName`, or `Surface`.

Support types are consumed in:

- backend tooling code, such as [@noodles-ui/lib-tools](../../support/lib-tools/README.md)
- tooling UI code, such as [@noodles-ui/live-app](../../support/live-app/README.md)
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
