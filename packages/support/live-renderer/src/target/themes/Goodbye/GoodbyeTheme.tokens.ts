export default {
    base: {
        global: {
            '--type-heading-base-fontFamily': 'Georgia, serif',
            '--type-text-base-fontFamily': 'Arial, sans-serif',
        },
        surfaces: {
            stage: {
                '--color-content-primary-color': '#ffeedd',
                '--color-content-muted-color': '#ddccbb',
                '--color-content-disabled-color': '#888877',
                '--surface-base-bg': '#221100',
            },
            card: {
                '--surface-base-bg': '#000000',
            },
            invert: {
                '--surface-base-bg': '#000000',
            },
        },
    },
    invert: {
        global: {},
        surfaces: {
            stage: {
                '--color-content-primary-color': '#221100',
                '--color-content-muted-color': '#665533',
                '--color-content-disabled-color': '#888877',
                '--surface-base-bg': '#ffeedd',
            },
            card: {
                '--surface-base-bg': '#white',
            },
            invert: {
                '--color-content-primary-color': '#ffeedd',
                '--color-content-muted-color': '#ddccbb',
                '--color-content-disabled-color': '#888877',
                '--surface-base-bg': '#221100',
            },
        },
    },
};
