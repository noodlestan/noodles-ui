export const FgColor = {
    type: 'variant',
    name: 'FgColor',
    attribute: 'color',
    options: ['default'],
    defaultOption: 'default',
    params: ['group'],
    surface: true,
    tokens: [
        {
            pattern: '--#{$group}-#{$option}-color',
        },
    ],
};
