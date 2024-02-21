import {
    type HeadingLevel,
    Heading as UnstyledHeading,
    type HeadingProps as UnstyledHeadingProps,
} from '@noodles-ui/core-unstyled';
import { Component } from 'solid-js';

import { contentColorClassList } from '../../variants';

import styles from './Heading.module.scss';

export type HeadingProps = UnstyledHeadingProps & {
    variant: string;
    color: string;
    level?: HeadingLevel;
};

const MAP_VARIANT_TO_LEVEL: Record<string, HeadingLevel> = {
    page: 1,
    section: 2,
    group: 3,
    item: 4,
};

export const Heading: Component<HeadingProps> = props => {
    const level = () => props.level || MAP_VARIANT_TO_LEVEL[props.variant];

    const classList = () => ({
        [styles.Heading]: true,
        [styles[`Heading-variant-${props.variant}`]]: true,
        ...contentColorClassList(props.color),
    });
    return <UnstyledHeading classList={classList()} {...props} level={level()} />;
};
