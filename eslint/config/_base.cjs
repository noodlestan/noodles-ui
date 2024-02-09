const baseRules = require('./rules/_base.cjs');

const base = {
    plugins: ['import', 'security', 'prettier'],
    extends: [
        'eslint:recommended',
        'standard',
        'plugin:prettier/recommended',
        'plugin:security/recommended',
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        node: true,
        es2022: true,
        browser: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        ...baseRules,
    },
};

module.exports = base;
