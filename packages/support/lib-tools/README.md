# Noodles UI / lib tools

> Utilities for building NoodlesUI design systems

Early days. See [root README](../../../README.md) for an introduction.

## Concern

CLI tool for library authors.

Implements

- `npm run dev:nui` - [watch.ts](./src/cli/watch.ts)
- `npm run build:nui` - [build.ts](./src/cli/build.ts)

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

## Building

```bash
npm run build
```

You can preview the build by running

```bash
npm run preview
```

#### Watch

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
