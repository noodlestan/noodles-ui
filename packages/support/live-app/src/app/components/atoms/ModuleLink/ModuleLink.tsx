import { PackageIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import { Icon } from '../Icon';
import { Link } from '../Link';

import styles from './ModuleLink.module.scss';

type ModuleLinkProps = {
    module: string;
};

export const ModuleLink: Component<ModuleLinkProps> = props => {
    const path = () => '/lib/' + props.module;
    const classList = () => ({
        [styles.ModuleLink]: true,
    });

    return (
        <Link href={path()} classList={classList()}>
            <Icon size="s" icon={PackageIcon} />
            {props.module}
        </Link>
    );
};
