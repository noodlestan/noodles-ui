# DevX

## Vitest issues noisy warning

Run `npm run test` (from the repository root or from within a package)

```
stderr | file:/Users/andretorgal/sources/noodles-ui/node_modules/solid-js/dist/dev.js:1747:67
You appear to have multiple instances of Solid. This can lead to unexpected behavior.

stderr | src/Foo/Foo.test.tsx > <Foo /> > renders
computations created outside a `createRoot` or `render` will never be disposed

stderr | src/Foo/Foo.test.tsx > <Foo /> > updates
computations created outside a `createRoot` or `render` will never be disposed
```

## ESLint struggles with auto-ordering around pure CSS imports

Plugin `eslint-plugin-import` ignores imports that don't assign identifiers (unassigned)

https://github.com/import-js/eslint-plugin-import/issues/1084#issuecomment-1935517770
