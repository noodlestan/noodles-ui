# Noodles UI / Core Services

> Core services and providers

Early days. See [root README](../../../README.md) for an introduction.

## Concern

Provide global context(s):

- available Themes
- available Surfaces
- current ColourScheme
- current Theme
- current Surface

Generate CSS class names to switch context of CSS tokens

// TODO: Resolve runtime tokens according to current color scheme, theme and surface

NOTE: might need isolated implementations for native/style/or specific adapters (e.g.: leveraging the `data-scope` optimization in [ark-ui](https://ark-ui.com/docs/styling/overview), or styling it with auto-generated panda snippets)

In that case surface/theme providers should not be coupled with the implementation

- css only (RootClasses)
- runtime only (RootStyles)
- both (RootHybrid) :-D

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
