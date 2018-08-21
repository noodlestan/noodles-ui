import { StartServer, createHandler } from '@solidjs/start/server';
import { Component, JSX } from 'solid-js';

type DocumentProps = {
    assets: JSX.Element;
    children: JSX.Element;
    scripts: JSX.Element;
};

const Document: Component<DocumentProps> = props => {
    return (
        <html lang="foo">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                {props.assets}
            </head>
            <body>
                <div id="app">{props.children}</div>
                {props.scripts}
            </body>
        </html>
    );
};

export default createHandler(() => (
    <StartServer
        document={({ assets, children, scripts }) => {
            return <Document assets={assets} children={children} scripts={scripts} />;
        }}
    />
));
