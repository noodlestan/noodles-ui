# Noodles UI / lib tools

> Tools for building and managing design systems

Early days. See [root README](../../../README.md) for an introduction.

## Concern

CLI tool for library authors.

See also:

- [support/live-app](../live-app/README.md) - Lib tools web interface
- [support/types](../types/README.md) - Types to support the design system build tools

## CLI Endpoints

### `nui build`

Single build

- Compiles and loads the project file
- compiles project file
- loads resources from project file
- generates code

Implemented by [build.ts](./src/cli/build.ts)

##### `nui build --hints`

Display hints about things you can _expand_ during the build, such as loaded `resources`, `project` entities, `generated` source code, and `timings`.

##### `nui build --expand`

Expand details about...

```bash
# details on project modules/packages used in the project
npm run build:nui -- --expand modules

# details on the project input data (loaded from resource files)
npm run build:nui -- --expand resources

# project entity list, by types
npm run build:nui -- --expand project

# expand entities by type (system, surface, mixin, variant, component, token, theme)
npm run build:nui -- --expand themes

# expand all entities from modules that contain "styled" in their name
npm run build:nui -- --expand @styled

# expand entities which contain "Heading" in their name
npm run build:nui -- --expand Heading

# generated source files
npm run build:nui -- --expand generated

# time spent, broken down by task
npm run build:nui -- --expand timings
```

#### `nui dev`

Builds, watches, and launches the [NUI Live](../live-app/README.md) web interface.

- Spawns a child process to execute `build:nui`
- Reloads watched files according to project modules
- Launch the Live server & app at http://localhost:3131/
- Forwards build status and outcomes to the Live app via socket
- Spawns a child process to execute `npm run dev` on the live preview http://localhost:3133/

TODO switch `--no-live` disables both the Live Server / App
TODO switch `--show-hints` reveal hints and shortcuts

Implemented by [dev.ts](./src/cli/dev.ts)

### Live Server

The web interface is served from http://localhost:3131/ and the frontend code is pre-built, provided by `@noodles-ui/live-app`

API endpoints from http://localhost:3131/api (consumed by the Live App):

- GET - http://localhost:3131/api/status - current build/snapshot
- POST http://localhost:3131/api/build - trigger a build

### Live Preview

The previews are built on the `.nui/live` directory served from http://localhost:3131/

The application skeleton is deployed from the `@noodles-ui/live-solidjs` package, and consists of a simple app, wrapped in the design system `Root` component - which provides themes, styles, context and tokens to the components - and a router that renders demos of the generated design system components in isolated pages.

The design system source code is also generated directly inside the `.nui/live/src` directory, alongside the demos.

### CLI

## Developing

```bash
npm run dev
```

Execute the tool by running `npm run dev:nui` or `npm run build:nui` in one of the UI libraries, for instance [Lab UI](../../ui-systems/lab-ui/README.md).

## Building

```bash
npm run build
```

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
