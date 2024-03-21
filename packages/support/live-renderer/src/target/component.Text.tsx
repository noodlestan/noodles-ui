/**
 * noodles-ui / auto-generated
 *
 * 2024-03-21T11:39:49.769Z
 * <project>/src/generated/component.Text.tsx
 */

import {
    Text as NoodlesUiCoreUnstyledText,
    type TextProps as NoodlesUiCoreUnstyledTextProps,
} from '@noodles-ui/core-unstyled';
import { Component, JSX } from 'solid-js';

import styles from './component.Text.module.scss';
import { TextTagDefaultOption, TextVariantDefaultOption } from './variants.constants';
import { TextTag, TextVariant } from './variants.types';
type RenderedProps = Omit<NoodlesUiCoreUnstyledTextProps, 'classList' | 'style'>;
export type TextProps = RenderedProps & {
    children: JSX.Element;
    variant: TextVariant;
    tag: TextTag;
};
export const Text: Component<TextProps> = props => {
    const variant = () => props.variant || TextVariantDefaultOption;
    const tag = () => props.tag || TextTagDefaultOption;
    const classList = () => ({
        [styles.Text]: true,
        [styles[`Text-variant-${variant()}`]]: true,
    });
    return <NoodlesUiCoreUnstyledText {...props} classList={classList()} tag={tag()} />;
};
