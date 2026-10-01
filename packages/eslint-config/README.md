# @glorification/eslint-config

![npm version](https://img.shields.io/npm/v/@glorification/eslint-config?logo=npm&logoColor=white) ![ESLint](https://img.shields.io/npm/dependency-version/@glorification/eslint-config/peer/eslint?logo=eslint) ![License](https://img.shields.io/npm/l/@glorification/eslint-config?logo=open-source-initiative)

The Glorification modern coding style as an ESLint flat config.

```bash
npm i -D eslint @glorification/eslint-config
```

```js
// eslint.config.js
import glorification from '@glorification/eslint-config'

export default glorification
```

TypeScript (`npm i -D typescript typescript-eslint`):

```js
import glorification from '@glorification/eslint-config'
import ts from '@glorification/eslint-config/ts'

export default [...glorification, ...ts]
```

Use it with [`@glorification/prettier-config`](https://github.com/itaym/glorification/tree/main/packages/prettier-config) — they agree on every rule they share,
so the order you run them in doesn't matter.

## Optional extras

Off by default. Add the ones you want after the base config:

| Extra | Import | What it enforces |
|---|---|---|
| Sorting | `@glorification/eslint-config/sorting` | sorted keys, destructuring, class fields and named imports; the constructor first |
| Aliases | `@glorification/eslint-config/aliases` | `node:` prefix for builtins; `#alias` imports instead of `../` |
| JSDoc | `@glorification/eslint-config/jsdoc` | a JSDoc block on every function, class and method, written the modern way |

```js
// eslint.config.js
import glorification from '@glorification/eslint-config'
import aliases from '@glorification/eslint-config/aliases'
import jsdoc from '@glorification/eslint-config/jsdoc'
import sorting from '@glorification/eslint-config/sorting'

export default [
    ...glorification,
    ...aliases,
    ...jsdoc,
    ...sorting,
]
```

Sorting also needs `npm i -D eslint-plugin-perfectionist`. Examples of every extra are in the
[main README](https://github.com/itaym/glorification#optional-extras).

## Have a good productive day :)

If you like this package please consider donation <a href="https://paypal.me/ItayMerchav?locale.x=en_US" target="_blank">Click Here</a>
