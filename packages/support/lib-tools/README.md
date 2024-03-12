# Noodles UI / lib tools

> Tools for building NoodlesUI design systems

Early days. See [root README](../../../README.md) for an introduction.

## Concern

CLI tool for library authors.

### Endpoints

#### `npm run build:nui`

Single build

- load project file
- compiles project file
- loads resources from project file
- generates code TODO document generated artefacts

Implemented by [build.ts](./src/cli/build.ts)

#### `npm run dev:nui`

Builds, watches, and launches the [lib-tools-app](../lib-tools-app/README.md) frontend.

- Serves the `lib-tools-app` from http://localhost:3131/
- Loads and compiles the project file
- Spawns a child process to execute `build:nui`
- Reloads watched files according to project modules
- Forwards build status and outcome to the client app

Implemented by [watch.ts](./src/cli/watch.ts)

### Types

The `Context` types are build time data that aggregates both the data seeded
via `*Resource*` files, information generated during the build process. And
eventually will aggregate any linked metadata as well.

Example: `ProjectContext`, `VariantsContext`, and `TokenContext`

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
