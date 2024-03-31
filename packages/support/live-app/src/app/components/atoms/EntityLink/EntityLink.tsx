import { UnknownEntity } from '@noodles-ui/core-entities';
import { getResourceTypedKey } from '@noodles-ui/core-resources';
import { Component } from 'solid-js';

import { Link } from '../Link';

type EntityLinkProps = {
    entity: UnknownEntity;
};

export const EntityLink: Component<EntityLinkProps> = props => {
    const path = () => '/' + getResourceTypedKey(props.entity).replace(':', '/');

    return <Link href={path()}>{props.entity.name}</Link>;
};
