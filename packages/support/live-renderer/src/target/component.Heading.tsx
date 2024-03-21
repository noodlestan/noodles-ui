/**
 * noodles-ui / auto-generated
 *
 * 2024-03-21T11:39:49.769Z
 * <project>/src/generated/component.Heading.tsx
 */

import {
    Heading as NoodlesUiCoreUnstyledHeading,
    type HeadingProps as NoodlesUiCoreUnstyledHeadingProps,
} from '@noodles-ui/core-unstyled';
import { Component, JSX } from 'solid-js';

import styles from './component.Heading.module.scss';
import {
    HeadingLevelDefaultOption,
    HeadingTagDefaultOption,
    HeadingVariantDefaultOption,
} from './variants.constants';
import { HeadingLevel, HeadingTag, HeadingVariant } from './variants.types';
type RenderedProps = Omit<NoodlesUiCoreUnstyledHeadingProps, 'classList' | 'style'>;
export type HeadingProps = RenderedProps & {
    level: HeadingLevel;
    children: JSX.Element;
    variant: HeadingVariant;
    tag: HeadingTag;
};
export const Heading: Component<HeadingProps> = props => {
    const level = () => props.level || HeadingLevelDefaultOption;
    const variant = () => props.variant || HeadingVariantDefaultOption;
    const tag = () => props.tag || HeadingTagDefaultOption;
    const classList = () => ({
        [styles.Heading]: true,
        [styles[`Heading-variant-${variant()}`]]: true,
    });
    return (
        <NoodlesUiCoreUnstyledHeading
            {...props}
            classList={classList()}
            level={level()}
            tag={tag()}
        />
    );
};
