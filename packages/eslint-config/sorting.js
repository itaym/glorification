import perfectionist from 'eslint-plugin-perfectionist'

/**
 * Optional extra: sorted keys, destructuring, class fields (constructor first) and named imports.
 * Add it after the base config.
 */
const sorting = [
    {
        plugins: {
            perfectionist,
        },
        rules: {
            '@stylistic/object-curly-newline': ['error', {
                ExportDeclaration: { minProperties: 2, multiline: true },
                ImportDeclaration: { minProperties: 2, multiline: true },
                ObjectExpression: { consistent: true, multiline: true },
                ObjectPattern: { consistent: true, multiline: true },
            }],
            'perfectionist/sort-classes': ['error', {
                customGroups: [
                    { groupName: 'ctor', selector: 'constructor' },
                    { groupName: 'fields', selector: 'property' },
                    {
                        anyOf: [
                            { selector: 'accessor-property' },
                            { selector: 'function-property' },
                            { selector: 'get-method' },
                            { selector: 'method' },
                            { selector: 'set-method' },
                            { selector: 'static-block' },
                        ],
                        groupName: 'members',
                        type: 'unsorted',
                    },
                ],
                groups: ['ctor', 'fields', 'members', 'unknown'],
                ignoreCase: true,
                type: 'alphabetical',
            }],
            'perfectionist/sort-named-exports': ['error', { ignoreCase: true, type: 'alphabetical' }],
            'perfectionist/sort-named-imports': ['error', { ignoreCase: true, type: 'alphabetical' }],
            'perfectionist/sort-objects': ['error', { ignoreCase: true, type: 'alphabetical' }],
        },
    },
]

export default sorting
