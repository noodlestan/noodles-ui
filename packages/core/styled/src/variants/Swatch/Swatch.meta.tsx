export const Swatch = {
    type: 'variant',
    name: 'Swatch',
    options: [],
    params: ['palette'],
    tokens: [
        {
            pattern: '--palette-#{palette}-#{$option}-color',
        },
    ],
};
