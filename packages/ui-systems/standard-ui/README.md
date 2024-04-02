# Noodles UI / Standard UI

> Production ready UI library with a token based, fully customizable, modern design

Early days. See [root README](../../../README.md) for an introduction.

## What

A Design System built with NUI, for SolidJS.

## Developing

Run all dev tasks in parallel

```bash
npm run dev
```

Or independently

```bash
npm run dev:nui   # compile project, generate code, live preview
npm run dev:test  # run tests
npm run dev:lib   # build library (a regular vite build)
```

Type `npm run build:nui -- --hints` (or `npx nui build --hints`) to display hints about things you can inspect during the build, such as loaded `resources`, `project` entities, `generated` source code, `timings`

For more information on `nui` command check out [@noodles-ui/lib-tools](../../support/lib-tools/README.md).

## Building

All build tasks in sequence:

- Generate code
- Run tests
- Build the library

```bash
npm run build:nui
```

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
