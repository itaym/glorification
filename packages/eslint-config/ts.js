import tseslint from 'typescript-eslint'

/** @type {string[]} */
const TS_FILES = ['**/*.cts', '**/*.mts', '**/*.ts', '**/*.tsx']

/** TypeScript layer; add it after the JS config: `[...glorification, ...ts]`. */
const ts = [
    ...tseslint.configs.recommended.map(config => ({ ...config, files: TS_FILES })),
    {
        files: TS_FILES,
        rules: {
            '@typescript-eslint/no-shadow': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-use-before-define': ['error', {
                classes: false,
                functions: false,
                variables: false,
            }],
            'no-shadow': 'off',
            'no-unused-vars': 'off',
            'no-use-before-define': 'off',
        },
    },
]

export default ts
