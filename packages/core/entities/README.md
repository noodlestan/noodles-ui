# Noodles UI / Core / Entities

> Types to support the design system build tools

Early days. See [root README](../../../README.md) for an introduction.

### Entity types

Describe entities in the built design system.

The design system **entities** are created when the **resources** are loaded and are originate generated source code.

Examples: `ThemeEntity`, `ComponentEntity`, and `VariantEntity`.

### Build context types

Aggregate the input resource, the generated entity, and metadata acquired during the build, e.g.: relationships between resources.

Examples: `ComponentBuildContext` and `ThemeBuildContext`.

The underlying definition types for inputs - `*Resource` types - are provided by [@noodles-ui/core-resources](../../core/resources/README.md#concern)

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
