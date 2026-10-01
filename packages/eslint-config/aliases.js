/** Optional extra: `node:` prefix for builtins and `#alias` imports instead of `../`. Add it after the base config. */
const aliases = [
    {
        rules: {
            'no-restricted-imports': ['error', {
                patterns: [{
                    group: ['../*', '../**'],
                    message: 'Use a #alias import (package.json "imports") for cross-folder imports.',
                }],
            }],
            'unicorn/prefer-node-protocol': 'error',
        },
    },
]

export default aliases
