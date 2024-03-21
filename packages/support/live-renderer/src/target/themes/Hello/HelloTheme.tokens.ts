export default {
    base: {
        global: {
            '--type-text-large-fontWeight': '36px',
            '--type-text-medium-fontWeight': '24px',
            '--type-text-body-fontWeight': '16px',
            '--type-text-note-fontWeight': '14px',
            '--type-heading-page-fontWeight': '36px',
            '--type-heading-section-fontWeight': '24px',
            '--type-heading-group-fontWeight': '16px',
            '--type-heading-item-fontWeight': '14px',
        },
        surfaces: {
            stage: {
                '--color-content-primary-color': '#eeeeff',
                '--color-content-muted-color': '#ccccdd',
                '--color-content-disabled-color': '#888899',
                '--surface-base-fg': '{--color-content-primary-color}',
                '--surface-base-bg': '#111122',
            },
            card: {
                '--surface-base-bg': '#000000',
            },
            invert: {
                '--surface-base-bg': '#000000',
            },
        },
    },
    light: {
        global: {},
        surfaces: {
            stage: {
                '--color-content-primary-color': '#111122',
                '--color-content-muted-color': '#444455',
                '--color-content-disabled-color': '#888899',
                '--surface-base-bg': '#eeeeff',
            },
            card: {
                '--surface-base-bg': '#ffffff',
            },
            invert: {
                '--color-content-primary-color': '#eeeeff',
                '--color-content-muted-color': '#ccccdd',
                '--color-content-disabled-color': '#888899',
                '--surface-base-bg': '#111122',
            },
        },
    },
};
