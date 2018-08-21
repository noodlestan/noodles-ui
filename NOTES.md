# Stack

- [SolidJS](https://www.solidjs.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)

# DevX

## Wishlist

- Publish packages with [Changesets](https://github.com/changesets/changesets)
- Switch from NVM to [ASDF](https://asdf-vm.com/)

## Known issues

## Vitest issues noisy warning(s)

Run `npm run test` (from the repository root or from within a package)

```
stderr | file:/Users/andretorgal/sources/noodles-ui/node_modules/solid-js/dist/dev.js:1747:67
You appear to have multiple instances of Solid. This can lead to unexpected behavior.
```

:point-up: Once per test suite

https://github.com/solidjs/solid/issues/1426

```
stderr | src/Foo/Foo.test.tsx > <Foo /> > renders
computations created outside a `createRoot` or `render` will never be disposed
```

:point-up: Once per test

https://github.com/solidjs/solid/discussions/1720

## Optimise coverage configuration

Can't find a way to configure which files to report coverage on.

This is specially annoying when running from the repository root, using vitest workspace features, as it matches all support code and scripts

**Work-around:** [coverage.all](https://vitest.dev/config/#coverage-all) was set to `false` in [vitest.config.mjs](https://github.com/noodlestan/noodles-ui/blob/vitest-setup-issues/config/vitest.config.mjs#L12)

## ESLint struggles with auto-ordering around pure CSS imports

Plugin `eslint-plugin-import` ignores imports that don't assign identifiers (unassigned)

https://github.com/import-js/eslint-plugin-import/issues/1084#issuecomment-1935517770
