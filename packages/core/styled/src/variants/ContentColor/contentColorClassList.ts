import styles from './ContentColor.module.scss';

export const contentColorClassList = (color?: string): { [x: string]: boolean } => {
    return {
        [styles[`ContentColor-color-${color}`]]: !!color,
    };
};
