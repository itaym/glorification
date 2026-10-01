/**
 * Glorification Prettier options; a needed semicolon goes at the start of the line: `;(() => {})()`.
 *
 * @type {import('prettier').Config}
 */
const config = {
    arrowParens: 'avoid',
    bracketSpacing: true,
    endOfLine: 'lf',
    printWidth: 120,
    quoteProps: 'as-needed',
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
}

export default config
