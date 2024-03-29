import { Component } from 'solid-js';

import { Link } from '../components/atoms/Link';
import { PageTitle } from '../components/atoms/PageTitle';
import { PageLayout } from '../components/layouts/PageLayout';

export const NotFoundPage: Component = () => {
    return (
        <PageLayout tag="main">
            <PageTitle>404</PageTitle>
            <p>Not found</p>
            <Link href="/">Back home</Link>
        </PageLayout>
    );
};
