# Noodles UI / lib tools

> Tools for building and managing design systems

Early days. See [root README](../../../README.md) for an introduction.

## Concern

CLI tool for library authors.

See also:

- [support/live-app](../live-app/README.md) - Lib tools web interface
- [support/types](../types/README.md) - Types to support the design system build tools

### Endpoints

#### `npm run build:nui`

Single build

- load project file
- compiles project file
- loads resources from project file
- generates code TODO document generated artefacts

Implemented by [build.ts](./src/cli/build.ts)

#### `npm run dev:nui`

Builds, watches, and launches the [live-app](../live-app/README.md) web interface.

- Serves the web interface from http://localhost:3131/
- Serves a couple of API endpoints from http://localhost:3131/api consumed by the web interface
- TODO spawns a child process to build the live preview app
- Compiles and loads the project file
- Spawns a child process to execute `build:nui`
- Reloads watched files according to project modules
- Forwards build status and outcome to the client app

Implemented by [watch.ts](./src/cli/watch.ts)

### CLI

## Developing

```bash
npm run dev
```

Execute the tool by running `npm run dev:nui` or `npm run build:nui` in one of the UI libraries, for instance [Sandbox UI](../../libs/sandbox-ui/README.md).

## Building

```bash
npm run build
```

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
