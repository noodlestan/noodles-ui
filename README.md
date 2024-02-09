# Noodles UI

> UI library framework (for SolidJS)

Goals:

- build design system UI library
- token based styling, with tokens available as data, CSS vars and TS data structures
- support for SSG, SSR and native implementations
- high standards accessibility features
- supreme authoring experience for developers, designers, and documentation authors

## In this repo

See each package's README for more details.

### Core packages

- [Services](./packages/core/services/README.md) - Core services and providers
- [Components](./packages/core/components/README.md) - Collection of unstyled components and primitives
- [Styles](./packages/core/styles/README.md) - Styles shared by the UI libraries

### UI libraries

- [Standard UI Library](./packages/libs/standard-ui/README.md) - Production ready UI library with a token based, fully costumisable, modern design
- [Proto UI Library](./packages/libs/proto-ui/README.md) - UI library for building prototypes with a neutral "wireframe-ish" look and feel

### Support packages

- [Docs](./packages/support/docs/README.md) - Noodles UI website, built with SolidJS SSG

## Development

Recommended software:

- [NVM](https://github.com/nvm-sh/nvm)
- [VS Code](https://code.visualstudio.com/)
- [VS Code Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [VS Code Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Commiting

[Lefthook](https://evilmartians.com/chronicles/lefthook-knock-your-teams-code-back-into-shape) should run automatically before every commit.

- lints all code
- does a global `tsc` compilation
- builds the base library
- builds the styled libraries
- builds the docs app

**Note:** if you encounter `🥊 lint` errors you should run `npm run lint` for details (linting is silent because `prettier` is noisy and breaks Lefthook's output buffering)

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
