# Noodles UI / Core / Compiler Types

> Types to support the design system build tools

Early days. See [root README](../../../README.md) for an introduction.

## Concern

Provide core domain types consistently across all systems.

Both backend and frontend consume `BuildSnapshotDto` alongside with `serializeSnapshot()` and `deserializeSnapshot()`

- server code, such as [@noodles-ui/lib-tools](../../support/lib-tools/README.md)
- UI code, such as [@noodles-ui/live-app](../../support/live-app/README.md)

Tooling code [@noodles-ui/core-compiler](../compiler/README.md), reference types such as `GeneratedSourceFile`, `ColourSchemeName`, or `Surface`.

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
