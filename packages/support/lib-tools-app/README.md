# Noodles UI / lib-tools-app

> Noodles UI lib tools web app, built with SolidJS

Early days. See [root README](../../../README.md) for an introduction.

## Concern

Provide a visual interface to the build status.

Connects to the server via socket and displays updates

- display if a build is in progress (?adn time elapsed)
- display last build outcome
- TODO list resources and generated artefacts
- TODO render artefact previews

## Developing

```bash
npm run dev
```

Launches http://localhost:3000/ serving the app in dev mode.

In dev mode all `/api` requests, including web socket connections, are directed locally to `localhost:3000` and then proxied by the vite devserver to http://localhost:3131/.

You need to have an instance of [dev:nui](../../) running to provide these endpoints.

Run `npm run dev:nui` in one of the UI libraries, for instance [Sandbox UI](../../libs/sandbox-ui/README.md), to start a server.

## Building

```bash
npm run build
```

The built app directs all `/api` requests, including web socket connections, to the default NUI dev server endpoint http://localhost:3131/api.

TODO provide a way to configure the production endpoint in run-time, so that client can reach out to the devserver when it is running in ports other than `3131` (possibly via query string? `?host=127.0.0.1&port=3333`)

You can preview the build by running

```bash
npm run preview
```

## License

Copyright (c) 2024 [Andre Torgal](https://andretorgal.com/).

Published under a [MIT License](https://andrezero.mit-license.org/2024).
