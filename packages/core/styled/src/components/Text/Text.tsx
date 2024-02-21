import {
    Text as UnstyledText,
    type TextProps as UnstyledTextProps,
} from '@noodles-ui/core-unstyled';
import { Component } from 'solid-js';

import { contentColorClassList } from '../../variants';

import styles from './Text.module.scss';

export type TextProps = UnstyledTextProps & {
    variant: string;
    color: string;
};

export const Text: Component<TextProps> = props => {
    const classList = () => ({
        [styles.Text]: true,
        [styles[`Text-variant-${props.variant}`]]: true,
        ...contentColorClassList(props.color),
    });

    return <UnstyledText classList={classList()} {...props} />;
};
