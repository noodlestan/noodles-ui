const { OFF } = require('../constants/severity.cjs');

const solidRules = require('./rules/solid.cjs');

const overrides = [
    {
        files: ['**/*.tsx'],
        plugins: ['solid', 'jsx-a11y'],
        extends: ['plugin:solid/recommended', 'plugin:jsx-a11y/recommended'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: './tsconfig.json',
            ecmaFeatures: {
                jsx: true,
            },
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        env: {
            browser: true,
        },
        rules: {
            ...solidRules,
            'jsx-a11y/iframe-has-title': [OFF],
        },
    },
];

module.exports = overrides;
