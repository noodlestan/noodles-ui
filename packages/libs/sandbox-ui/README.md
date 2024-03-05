# Noodles UI / Sandbox UI

> Noodles UI experimenation sandbox library

Early days. See [root README](../../../README.md) for an introduction.

## Developing

**Note:** see [@noodles-ui/lib-tools](../../support/lib-tools/README.md) for more on `xxx:nui` commands.

Run all dev tasks in parallel

```bash
npm run dev
```

![](../../support/lib-tools/resources/readme/screenshot-build-success.png)

Or independently

```bash
npm run dev:nui   # generate code
npm run dev:test  # tests
npm run dev:lib   # build library
```

To inspect the generated project data you can expand the branches with the `--expand` argument.

```bash
npm run build:nui -- --expand Heading
npm run build:test -- --expand themes
npm run build:lib -- --expand @core-styled
# you can combine more than one (union, TODO intersection)
npm run build:nui -- --expand @core-styled --expand Heading
```

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
