# Noodles UI

> UI library framework (for SolidJS)

Goals:

- Support the creation and management of large, complex, and/or many design system UI libraries
- Build quickly on top of high quality headless components and primitives (Kobalte, Ark UI, and Noodles own catalogue)
- Use a tokens first approach to all things design, style, themes, code, and tools
- Auto generate high performance and platform specific code, while preserving the ability to extend it
- Supreme authoring experience for developers, designers, and documentation authors alike
- (Maybe) Support SSG, SSR and native targets (eventually via different transforms)
- (Maybe) Support different frameworks (React, Vue, SolidJS, Angular)

## In this repo

See each package's README for more details.

### Core packages

- [Services](./packages/core/services/README.md) - Core services and providers
- [Components](./packages/core/unstyled/README.md) - Collection of unstyled components and primitives
- [Styles](./packages/core/styled/README.md) - Styles shared by the UI libraries

### UI libraries

- [Sandbox UI Library](./packages/libs/sandbox-ui/README.md) - Production ready UI library with a token based, fully costumisable, modern design
- [Standard UI Library](./packages/libs/standard-ui/README.md) - Production ready UI library with a token based, fully costumisable, modern design
- [Proto UI Library](./packages/libs/proto-ui/README.md) - UI library for building prototypes with a neutral "wireframe-ish" look
  and feel

### Catalogue

Use high quality components and primitives from headless libraries

- [Lib tools](./packages/catalog/kobalte/README.md) - Catalogue of [Kobalte](https://kobalte.dev/) components
- [Sandbox components](./packages/catalog/ark=ui/README.md) - Catalogue of [ArkUI](https://ark-ui.com/) components

### Support packages

- [Lib tools](./packages/support/lib-tools/README.md) - Tooling for building Noodles UI libraries
- [Sandbox components](./packages/support/sandbox-components-solid/README.md) - SolidJS Components for Noodles UI Sandboxes

### Sandboxes

Where we snchronously test new features and retro-comppatyibility with specific environments

- [SolidJs](./packages/sandbox/app-solid/README.md) - Noodles UI sandbox built with SolidJS (Web SPA)
- [SolidStart](./packages/sandbox/app-solidstart/README.md) - Noodles UI sandbox built with SolidStart (SSG)

### Docs

- [Docs](./packages/support/docs/README.md) - Noodles UI website

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
