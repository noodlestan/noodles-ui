import { FgColor } from '../FgColor/FgColor.meta';

export const ContentColor = {
    type: 'variant',
    name: 'ContentColor',
    extend: {
        variant: FgColor,
        params: { group: 'content' },
        customise: {
            options: ['primary', 'muted', 'disabled'],
            defaultOption: 'primary',
        },
    },
};
