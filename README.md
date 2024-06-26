# Noodles UI

> Tokens first design system generator

Still early days, but already useful for my own projects.

| NUI CLI                                                                                        | NUI Live Preview                                                                              |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![](https://raw.githubusercontent.com/noodlestan/.github/main/profile/assets/nui-devx-cli.png) | ![](https://raw.githubusercontent.com/noodlestan/.github/main/profile/assets/nui-devx-ui.png) |

- Comfortable CLI and live preview experience
- Currently capable of generating SolidJS components with SCSS modules styles.
- Could potentially target React, Vue, Svelte or native libraries, as well as Tailwind, PandaCSS, Vanilla, and other styling stacks.

**Goals:**

- Support the creation and management of large, complex, and/or many design system UI libraries
- Build quickly on top of high quality headless components and primitives ([Kobalte](https://kobalte.dev/) and Noodles own catalogue)
- Use a tokens first approach to all things design, style, themes, code, and tools
- Auto generate high performance and platform specific code, while preserving the ability to extend it
- Supreme authoring experience for developers, designers, and documentation authors alike
- (Maybe) Support SSG, SSR and native targets (eventually via different transforms)
- (Maybe) Support different frameworks (React, Vue, SolidJS, Angular)

## In this repo

See each package's README for more details.

### Core packages

- [Types](./packages/core/types/README.md) - Core domain types
- [Resources](./packages/core/resources/README.md) - Types for modeling design systems
- [Entities](./packages/core/entities/README.md) - Types to support the design system build tools
- [Diagnostics](./packages/core/diagnostics/README.md) - Types for modeling build diagnostics
- [Compiler Types](./packages/core/compiler-types/README.md) - More types to support the design system build tools
- [Compiler](./packages/core/compiler/README.md) - Design system project compiler.
- TODO extract `core-generator` from lib-tools

### SolidJS

High quality components from headless libraries and catalogue of styling primitives

- [Services](./packages/solidjs/services/README.md) - Core services and providers
- [Kobalte](./packages/solidjs/kobalte/README.md) - Catalogue of [Kobalte](https://kobalte.dev/) components
- [Unstyled](./packages/solidjs/unstyled/README.md) - Headless (unstyled) components and primitives
- [Styled](./packages/solidjs/styled/README.md) - Styling components and primitives

### UI libraries

Libraries built with NUI

- [Lab UI Library](./packages/ui-systems/lab-ui/README.md) - Noodles UI experimentation & playground library
- [Standard UI Library](./packages/ui-systems/standard-ui/README.md) - Production ready UI library with a token based, fully customizable, modern design
- [Proto UI Library](./packages/ui-systems/proto-ui/README.md) - UI library for building prototypes with a neutral "wireframe-ish" look
  and feel
- [Blank UI Library](./packages/ui-systems/blank-ui/README.md) - A blank state library used to test the DevX.

### Support packages

- [Lib tools](./packages/support/lib-tools/README.md) - CLI Tools for building and managing design systems
  - TODO extract `/generator` to `@noodles-ui/core-generator`
  - TODO rename to `@noodles-ui/cli`
- [Live app](./packages/support/live-app/README.md) - Lib tools web interface
- [Sandbox components](./packages/support/sandbox-components-solid/README.md) - SolidJS Components for Noodles UI Sandboxes

### Sandbox apps

Where we synchronously test new features and retro-compatibility with specific environments

- [SolidJs](./packages/sandbox/app-solid/README.md) - Noodles UI sandbox built with SolidJS (Web SPA)
- [SolidStart](./packages/sandbox/app-solidstart/README.md) - Noodles UI sandbox built with SolidStart (SSG)

### Docs

- [Docs](./packages/support/docs/README.md) - Noodles UI website

## Development

Recommended software:

- [Node.js](https://nodejs.org/en) (see [.nvmrc](./.nvmrc) for which version, use [NVM](https://github.com/nvm-sh/nvm) to install it)
- [VS Code](https://code.visualstudio.com/) \+ VS Code Plugins:
  - [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright)

### Committing

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
