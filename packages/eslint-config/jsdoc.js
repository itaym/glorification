import jsdocPlugin from 'eslint-plugin-jsdoc'

/** @type {string[]} */
const TS_FILES = ['**/*.cts', '**/*.mts', '**/*.ts', '**/*.tsx']

/** Optional extra: JSDoc on every function, class and method, written the modern way. Add it after the base config. */
const jsdoc = [
    {
        plugins: {
            jsdoc: jsdocPlugin,
        },
        rules: {
            'jsdoc/check-param-names': 'error',
            'jsdoc/check-tag-names': 'error',
            'jsdoc/check-types': 'error',
            'jsdoc/match-description': ['error', {
                matchDescription: '^[A-Z\\d`\\{][\\s\\S]*\\.\\s*$',
                message: 'The description is a sentence: capital first letter, ending with a period.',
            }],
            'jsdoc/no-restricted-syntax': ['error', {
                contexts: [{
                    comment: 'JsdocBlock:has(JsdocTypeObject)',
                    context: 'any',
                    message: 'Use a named @typedef instead of an inline object type.',
                }],
            }],
            'jsdoc/require-jsdoc': ['error', {
                require: {
                    ArrowFunctionExpression: true,
                    ClassDeclaration: true,
                    ClassExpression: true,
                    FunctionDeclaration: true,
                    FunctionExpression: true,
                    MethodDefinition: true,
                },
            }],
            'jsdoc/require-param': 'error',
            'jsdoc/require-returns': 'error',
            'jsdoc/tag-lines': ['error', 'never', { startLines: 1 }],
        },
        settings: {
            jsdoc: {
                mode: 'typescript',
                preferredTypes: {
                    'Array<>': '[]',
                    Function: {
                        message: 'Write the signature, e.g. `(key: string) => *`, or use AnyFn.',
                        replacement: false,
                    },
                    object: 'Object',
                },
            },
        },
    },
    {
        files: TS_FILES,
        rules: {
            'jsdoc/no-types': 'error',
            'jsdoc/require-param-type': 'off',
            'jsdoc/require-returns-type': 'off',
        },
    },
]

export default jsdoc
