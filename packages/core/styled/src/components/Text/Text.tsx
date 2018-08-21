import { classListFromClassNames } from '@noodles-ui/core-services';
import {
    Text as UnstyledText,
    type TextProps as UnstyledTextProps,
} from '@noodles-ui/core-unstyled';
import { Component } from 'solid-js';

import { contentColorClassName } from '../../variants';

import styles from './Text.module.scss';

export type TextProps = Pick<UnstyledTextProps, 'tag' | 'children'> & {
    variant: string;
    color: string;
};

export const Text: Component<TextProps> = props => {
    const classList = () => ({
        [styles.Text]: true,
        [styles[`Text-variant-${props.variant}`]]: true,
        ...classListFromClassNames([contentColorClassName(props.color)]),
    });

    return <UnstyledText classList={classList()} {...props} />;
};
