# Noodles UI / Live app

> Lib tools web interface

Early days. See [root README](../../../README.md) for an introduction.

## Concern

Provide a visual interface to the project's build status.

See also:

- [support/lib-tools](../lib-tools/README.md) - Tools for building and managing design systems
- [support/types](../types/README.md) - Types to support the design system build tools

Connects to the [NUI Live Server](../lib-tools/README.md#live-server) via socket and displays updates

- displays if a build is in progress
- displays last build outcome
- allows triggering a new build from the UI
- lists design system entities
- renders live previews of design system entities

The live previews are provided by an independent app that renders the entity in isolation from within an iframe. This other app is also, deployed, generated and built by the [lib-tools](../lib-tools/README.md) commands.

## Developing

```bash
npm run dev
```

Launches http://localhost:3000/ serving the app in dev mode.

Make sure you have a NUI Live Server listening. You can start one by running `npm run dev:nui` in one of the design libraries, for instance [Sandbox UI](../../libs/sandbox-ui/README.md).

**Note:** In dev mode all `/api` requests, including web socket connections, are directed locally to `localhost:3000` and then proxied by the Vite development server to the NUI Live Server http://localhost:3131/.

## Building

```bash
npm run build
```

The built app directs all `/api` requests, including web socket connections, to the default NUI dev server endpoint http://localhost:3131/api.

TODO provide a way to configure the production endpoint in run-time, so that client can reach out to the NUI Live Server when it is running in ports other than `3131` (possibly via query string? `?host=127.0.0.1&port=3333`)

## Previewing

You can preview the build by running

```bash
npm run preview
```

**Note:** the built code won't pick up the port from the `vite preview` process so, API requests and socket connection won't work.

## Deploying

The built app is automatically served when you run `npm run dev:nui` in a design system library, for instance [Sandbox UI](../../libs/sandbox-ui/README.md).

In production mode, since the app is served directly from http://localhost:3131/ there is no proxy involved.

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
