const { OFF } = require('../constants/severity.cjs');

const overrides = [
    {
        files: ['**/*.test.tsx', '**/*.test.ts', '**/test/**/*.ts'],
        rules: {
            'import/no-extraneous-dependencies': [OFF],
            '@typescript-eslint/no-non-null-assertion': [OFF],
        },
    },
];

module.exports = overrides;
