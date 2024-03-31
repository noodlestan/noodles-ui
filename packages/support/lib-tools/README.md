# Noodles UI / lib tools

> Tools for building and managing design systems

Early days. See [root README](../../../README.md) for an introduction.

## Concern

CLI tool for library authors.

See also:

- [support/live-app](../live-app/README.md) - Lib tools web interface
- [support/types](../types/README.md) - Types to support the design system build tools

### CLI Endpoints

TODO exposed them via built `./bin`

#### `npm run build:nui`

Single build

- load project file
- compiles project file
- loads resources from project file
- generates code TODO document generated artifacts

Implemented by [build.ts](./src/cli/build.ts)

#### `npm run dev:nui`

Builds, watches, and launches the [NUI Live](../live-app/README.md) web interface.

-
- TODO spawns a child process to build the live preview app
- Compiles and loads the project file
- Spawns a child process to execute `build:nui`
- Reloads watched files according to project modules
- Forwards build status and outcome to the client app

TODO switch `--no-live` disables both the Live Server / App
TODO switch `--show-hints` reveal hints and shortcuts

### Live Server

The web interface is served from http://localhost:3131/

API endpoints from http://localhost:3131/api (consumed by the Live App):

- GET - http://localhost:3131/api/status - current build/snapshot
- POST http://localhost:3131/api/build - trigger a build

Implemented by [dev.ts](./src/cli/dev.ts)

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
