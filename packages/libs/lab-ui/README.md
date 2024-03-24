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

### Expanding build details

> TODO display data and diagnostics in live preview app at http://localhost:3131/ as well.

To inspect the loaded resources, the generated project data and source code, and eventual errors you can expand details with the `--expand` argument.

```bash
# expand all entities by type
npm run build:nui -- --expand theme

# expand all entities from modules that contain styled in their named
npm run build:nui -- --expand @styled

# show details about the project generated source files
npm run build:nui -- --expand project --expand generated
```

For more information on things you can inspect via `--expand` type:

```bash
npm run build:nui -- --hints
```

For more information on `dev:nui` command check out [@noodles-ui/lib-tools](../../support/lib-tools/README.md).

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
