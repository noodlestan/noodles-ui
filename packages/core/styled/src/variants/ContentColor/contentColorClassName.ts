import styles from './ContentColor.module.scss';

export const contentColorClassName = (color?: string): string | undefined => {
    return color ? styles[`ContentColor-color-${color}`] : undefined;
};
