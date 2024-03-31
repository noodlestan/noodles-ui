# Noodles UI / Core Resources

> Types for modeling design systems

Early days. See [root README](../../../README.md) for an introduction.

## Concern

Provide core domain types consistently across all systems.

Resource types are consumed in:

- resource files, e.g.: [Surface.nui.ts](../../core/styled/src/components/Surface/Surface.nui.ts)
- backend tooling code, such as [@noodles-ui/lib-tools](../../support/lib-tools/README.md)
- instrumentation and analytics
- documentation and visualization code

### Resource types

Declare and describe design system definition resources and their relationships across multiple packages.

Once loaded, **resources** originate design system **entities**.

Examples: `ThemeResource`, `ComponentResource`, and `VariantResource`.

> IMPORTANT: Code that ships to clients in production is forbidden to reference these types.
> (except for run-time instrumentation code).

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
