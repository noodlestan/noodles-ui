# Noodles UI / Lab UI

> Noodles UI experimentation & playground library

Early days. See [root README](../../../README.md) for an introduction.

## Developing

Run all dev tasks in parallel

```bash
npm run dev
```

This will load project resource files, compile the project, generate code and launch the live preview app at http://localhost:3131/.

The process will remain running and will rebuild all the project - or the relevant parts - when changes are made to resource files or source code.

![](../../support/lib-tools/resources/readme/screenshot-build-success.png)

You can also run each dev task independently

```bash
npm run dev:nui   # compile project, generate code, live preview
npm run dev:test  # tests
npm run dev:lib   # build library (a regular vite build)
```

**Note:** the `dev:nui` command is an entry point for [@noodles-ui/lib-tools](../../support/lib-tools/README.md).

To inspect the loaded resources, the generated project data, and eventual errors you can expand details with the `--expand` argument.

You can expand resources and build artifacts...

- by matching all or part of its **name**
- by **type** (one of `surface`, `theme`, `variant`, `component`, `mixin`)
- by matching all or part of its **module**'s name (when pattern starts with `@`).

Examples (by name, by type, by module):

```bash
npm run build:nui -- --expand Heading
npm run build:test -- --expand theme
npm run build:lib -- --expand @core-styled
```

You can also expand details of build errors caught when linting generated files:

```bash
npm run build:nui -- --expand eslint
```

You can combine more than one pattern:

```bash
npm run build:nui -- --expand @core-styled --expand Heading
```

**Note:** the `--expand` patterns are combined as a union filter
// TODO intersection filter

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
