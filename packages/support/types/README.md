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

### Build context types

Aggregate the input resource, the generated entity, and metadata acquired during the build, e.g.: relationships between resources.

Examples: `ComponentBuildContext` and `ThemeBuildContext`.

The underlying definition types for both inputs - `*Resource` and entities - `*Entity` - are provided by [@noodles-ui/core-types](../../core/types/README.md#concern).

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
