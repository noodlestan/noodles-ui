import { Component } from 'solid-js';

import { Link } from '../Link';

type EntityKeyLinkProps = {
    key: string;
};

export const EntityKeyLink: Component<EntityKeyLinkProps> = props => {
    const path = () => '/' + props.key.replace(':', '/');

    return <Link href={path()}>{props.key}</Link>;
};
