# Glorification

![License](https://img.shields.io/npm/l/@glorification/eslint-config?logo=open-source-initiative)

**→ Also: [@glorification/prettier-config](https://www.npmjs.com/package/@glorification/prettier-config)** — the
matching Prettier config.

**A modern coding style for modern JavaScript and TypeScript** — shipped as a ready-made ESLint flat config
and a matching Prettier config.

Glorification is an opinionated, modern coding style: clean, quiet, and consistent from the first line to
the last. No semicolons, single quotes, 4-space indentation, 120 columns, trailing commas, arrow functions
everywhere — and a linter that enforces all of it for you, so you never argue about style in a code review again.

It is built on the three most widely used rule sets — **Airbnb**, **StandardJS** and **`eslint:recommended`** —
merged, de-duplicated, and bent into one modern coding style. On top of it sit **optional extras** for the
people who want to go all the way: sorting, import aliases, JSDoc, and a set of hand-applied habits.

- [The packages](#the-packages)
- [Quick start](#quick-start)
- [The modern coding style, by example](#the-modern-coding-style-by-example)
  - [A whole module](#a-whole-module)
  - [Multi-line code](#multi-line-code)
  - [Control flow](#control-flow)
  - [Functions, variables and exports](#functions-variables-and-exports)
  - [Also enforced](#also-enforced)
  - [Semicolons](#semicolons)
- [Optional extras](#optional-extras)
  - [Sorting](#sorting)
  - [Aliases](#aliases)
  - [JSDoc](#jsdoc)
  - [Hand-applied extras](#hand-applied-extras)
- [Turning a rule off](#turning-a-rule-off)
- [TypeScript](#typescript)
- [Editor setup](#editor-setup)
- [Why a modern coding style needs a linter](#why-a-modern-coding-style-needs-a-linter)
- [Requirements](#requirements)
- [Contributing](#contributing)

---

## The packages

| Package | What it does |
|---|---|
| [`@glorification/eslint-config`](https://github.com/itaym/glorification/tree/main/packages/eslint-config) | The modern coding style as an ESLint flat config — plus the optional extras |
| [`@glorification/prettier-config`](https://github.com/itaym/glorification/tree/main/packages/prettier-config) | The same modern coding style for Prettier — the two never fight |

Both are tiny. The ESLint config brings its plugins as regular dependencies, so you install one package, not ten.
ESLint and Prettier themselves are **peer dependencies** — your project keeps its own copy. Everything optional
stays optional: a plain JavaScript project never downloads TypeScript, and nobody downloads the sorting plugin
unless they turn sorting on.

---

## Quick start

```bash
npm i -D eslint prettier @glorification/eslint-config @glorification/prettier-config
```

**`eslint.config.js`**

```js
import glorification from '@glorification/eslint-config'

export default glorification
```

**`package.json`**

```json
{
    "prettier": "@glorification/prettier-config",
    "scripts": {
        "format": "prettier --write .",
        "lint": "eslint .",
        "lint:fix": "eslint --fix ."
    },
    "type": "module"
}
```

Run it:

```bash
npm run format && npm run lint:fix
```

That's the modern coding style, applied to your whole project.

---

## The modern coding style, by example

Every ✓ example below passes the config as-is.

### A whole module

A small user service, written the way most JavaScript is written today — Prettier's defaults and common habits:

```js
// ✗ before
import fs from "fs";
import path from "path";

const DEFAULT_TIMEOUT = 30000;

const cache = { hits: 0, users: {} };

export default class UserService {
  constructor(baseUrl, options) {
    this.baseUrl = baseUrl;
    this.options = options || {};
  }

  get(id) {
    if (this.options.cache === true && cache.users[id]) {
      cache.hits = cache.hits + 1;
      return Promise.resolve(cache.users[id]);
    }
    const url = this.baseUrl + "/users/" + id;
    return fetch(url, { timeout: DEFAULT_TIMEOUT })
      .then((response) => response.json())
      .then((user) => {
        cache.users[id] = user;
        return user;
      });
  }
}
```

The same module in the modern coding style:

```js
// ✓ the modern coding style
const DEFAULT_TIMEOUT = 30_000

const cache = { hits: 0, users: {} }

class UserService {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl
        this.options = options
    }

    async get(id) {
        if (this.options.cache && cache.users[id]) {
            cache.hits += 1
            return cache.users[id]
        }
        const response = await fetch(`${this.baseUrl}/users/${id}`, { timeout: DEFAULT_TIMEOUT })
        const user = await response.json()
        cache.users[id] = user
        return user
    }
}

export default UserService
```

What changed:

- 4-space indentation, 120 columns, single quotes, no semicolons — the `fetch` call fits on one line
- `async` / `await` instead of a `.then` chain; unused imports are gone
- a template literal where a string is built from pieces
- `30_000` — numbers of 5+ digits use `_` separators
- `if (this.options.cache)` — flags are checked as themselves, not `=== true`
- `cache.hits += 1` instead of `cache.hits = cache.hits + 1`
- `options = {}` — a real default instead of `options || {}`
- the class is defined first and exported at the end, not `export default class`

### Multi-line code

```js
// ✗ before
const server = {
  host: "localhost",
  port: 8080,
  routes: [ "/users", "/orders" ]
};


const retryPolicy = [
  { attempts: 3, delay: 100 },
  { attempts: 5, delay: 500 }
];

const canStart = server.routes.length > 0
  && retryPolicy.every((policy) => policy.attempts > 0 && policy.delay >= 100)
  && !server.host.startsWith("0.");

if (canStart)
{

  startServer(server.host, server.port, {
    onError: (err) => log("failed", err),
    onReady: () => log("ready")
  });

}
```

```js
// ✓ the modern coding style
const server = {
    host: 'localhost',
    port: 8080,
    routes: ['/users', '/orders'],
}

const retryPolicy = [
    { attempts: 3, delay: 100 },
    { attempts: 5, delay: 500 },
]

const canStart =
    server.routes.length > 0 &&
    retryPolicy.every(policy => policy.attempts > 0 && policy.delay >= 100) &&
    !server.host.startsWith('0.')

if (canStart) {
    startServer(server.host, server.port, {
        onError: err => log('failed', err),
        onReady: () => log('ready'),
    })
}
```

- `{` stays at the end of the line that opens the block
- no spaces inside `[ ]`, one space inside `{ }`
- a trailing comma in every multi-line object, array, argument list and parameter list — so adding a line
  never touches the one above it in a diff
- a long condition breaks after `&&` / `||`, not before
- no blank line right after `{` or right before `}`; never two blank lines in a row

### Control flow

A request handler, before and after:

```js
// ✗ before
const handle = async (request, reply) => {
  if (!request.user)
    return reply.status(401).send();
  let payload;
  try {
    payload = JSON.parse(request.body);
  }
  catch (err) {
    return reply.status(400).send();
  }
  switch (payload.action) {
    case "create":
      return reply.send(await create(payload));
    case "delete":
      return reply.send(await remove(payload.id));
  }
  if (payload.dryRun === true) {
    return reply.send({ ok: true });
  } else {
    return reply.status(422).send();
  }
};
```

```js
// ✓ the modern coding style
const handle = async (request, reply) => {
    if (!request.user) return reply.status(401).send()
    let payload
    try {
        payload = JSON.parse(request.body)
    } catch {
        return reply.status(400).send()
    }
    switch (payload.action) {
        case 'create':
            return reply.send(await create(payload))
        case 'delete':
            return reply.send(await remove(payload.id))
        default:
            break
    }
    if (payload.dryRun) return reply.send({ ok: true })
    return reply.status(422).send()
}
```

- a one-line `if` needs no braces; once the body moves to its own line, braces are required
- `} else {`, `} catch {`, `} finally {` stay on one line
- an error you don't use is left out: `catch {` — and an empty `catch {}` is fine
- every `switch` has a `default`
- no `else` after a `return` — the code after the `if` already is the else

### Functions, variables and exports

A small data-mapping module:

```js
// ✗ before
export default function toReport(orders, currency = undefined) {
  let total = 0,
    count = 0;
  let lines = [];
  for (let order of orders) {
    let amount = order.price * order.quantity;
    total = total + amount;
    count++;
    lines.push({ id: order.id, amount: amount, currency: currency });
  }
  return { lines: lines, total: total, count: count, average: total / count };
}

export function formatMoney(value) {
  return value.toFixed(2);
}
```

```js
// ✓ the modern coding style
export const formatMoney = value => value.toFixed(2)

const toReport = (orders, currency = 'USD') => {
    const lines = []
    let total = 0
    for (const order of orders) {
        const amount = order.price * order.quantity
        total += amount
        lines.push({ amount, currency, id: order.id })
    }
    const count = orders.length
    return { average: total / count, count, lines, total }
}

export default toReport
```

- top-level functions are arrow constants; `function` stays only where `this` or a generator needs it
- an arrow that only returns uses the short form: `value => value.toFixed(2)`
- one plain parameter goes without parentheses: `value =>`, not `(value) =>`
- `const` unless it's reassigned — also in `for (const order of orders)`; one declaration per `const` / `let`
- no `= undefined` defaults — give the real default, or none
- shorthand properties: `{ amount, currency }`
- default exports are defined first and exported at the end

### Also enforced

On top of its own rules, the modern coding style keeps the bug catchers everybody agrees on — all of
`eslint:recommended` plus the rules Airbnb and StandardJS share (`no-undef`, `eqeqeq` with `== null` allowed,
`no-var`, `no-throw-literal`, the Node and Promise checks) — and a handful of choices that keep code honest:

```js
// ✗ before
const ready = loadConfig();                         // no-use-before-define: runs before loadConfig exists

const loadConfig = () => ({ debug: false });

const summarize = (items) => {
  let sum = 0;
  for (const item of items) {
    const sum = item.price * item.count;            // no-shadow: hides the outer `sum`
    items.last = item;                              // no-param-reassign: changes the caller's array
  }
  const label = sum > 100 ? "big" : sum > 10 ? "medium" : "small"; // no-nested-ternary
  if (sum > 0) return { label, sum };               // consistent-return: a value here...
};                                                  // ...and nothing at the end
```

```js
// ✓ the modern coding style
const loadConfig = () => ({ debug: false })

const ready = loadConfig()

const sizeOf = sum => {
    if (sum > 100) return 'big'
    if (sum > 10) return 'medium'
    return 'small'
}

const summarize = items => {
    let sum = 0
    for (const item of items) {
        sum += item.price * item.count
    }
    return { label: sizeOf(sum), sum }
}
```

| Rule | Setting |
|---|---|
| `consistent-return` | a function returns a value on every path or on none |
| `default-case` | every `switch` has a `default` |
| `import-x/no-cycle` | no circular imports |
| `no-nested-ternary` | one ternary at a time |
| `no-param-reassign` | parameters are read-only (disable locally when it's deliberate) |
| `no-shadow` | an inner name never hides an outer one |
| `no-use-before-define` | only where it matters: code that runs at module load |
| `prefer-destructuring` | `const { base } = config` |

And some things a modern coding style simply allows: `i++`, bitwise operators, `a = b = c()`, object spread,
string concatenation, `_private` helpers.

### Semicolons

The modern coding style has no semicolons. The rare one that JavaScript really needs — before a line that starts
with `(`, `[` or `` ` `` — goes at the **start** of that line:

```js
// ✗ before
const timeout = 1000;
const values = [3, 1, 2];

(async () => {
  await start(timeout);
})();

[values[0], values[2]] = [values[2], values[0]];
`${name} is ready`.split(" ").forEach((word) => print(word));
```

```js
// ✓ the modern coding style
const timeout = 1000
const values = [3, 1, 2]

;(async () => {
    await start(timeout)
})()

;[values[0], values[2]] = [values[2], values[0]]
;`${name} is ready`.split(' ').forEach(word => print(word))
```

Blank lines don't help: without the `;`, `const values = [3, 1, 2]` and the next `(` would join into
`[3, 1, 2](…)`. Prettier (`semi: false`) and ESLint agree on this, so they can run in any order.

---

## Optional extras

The base config is the modern coding style everyone can live with. The extras go further — each one is
**off by default**, and you add only the ones you want, **after** the base config:

| Extra | Import | What it enforces |
|---|---|---|
| Sorting | `@glorification/eslint-config/sorting` | sorted object keys, destructuring, class fields and named imports; the constructor first |
| Aliases | `@glorification/eslint-config/aliases` | `node:` prefix for builtins; `#alias` imports instead of `../` |
| JSDoc | `@glorification/eslint-config/jsdoc` | a JSDoc block on every function, class and method, written the modern way |
| Hand-applied | — | habits no tool can check, [listed below](#hand-applied-extras) |

```js
// eslint.config.js — the modern coding style with every extra
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

Sorting needs one more package: `npm i -D eslint-plugin-perfectionist`.

### Sorting

A sorted file reads like a table: you find a key, a field or an import without scanning. Here is a small
persistence store:

```js
// ✗ without sorting
import { writeFile, readFile, rename, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";

class Store {
  #map = new Map();
  #file;
  static #count = 0;

  get(key) {
    return this.#map.get(key);
  }

  constructor({ file, idleMs, debug }) {
    this.#file = file;
    this.#options = { idleMs: idleMs, retries: 3, debug: debug };
    Store.#count += 1;
  }

  #options;
  #dirty = false;

  async save() {
    if (!this.#dirty) return;
    await mkdir(dirname(this.#file), { recursive: true });
    await writeFile(join(this.#file), JSON.stringify([...this.#map]));
    await rename(this.#file, `${this.#file}.bak`);
    this.#dirty = this.#options.debug;
  }

  async load() {
    return readFile(this.#file, "utf8");
  }

  static count() {
    return Store.#count;
  }
}
```

```js
// ✓ with sorting
import {
    mkdir,
    readFile,
    rename,
    writeFile,
} from 'node:fs/promises'
import {
    dirname,
    join,
} from 'node:path'

class Store {
    constructor({ debug, file, idleMs }) {
        this.#file = file
        this.#options = { debug, idleMs, retries: 3 }
        Store.#count += 1
    }

    static #count = 0
    #dirty = false
    #file
    #map = new Map()
    #options

    get(key) {
        return this.#map.get(key)
    }

    async save() {
        if (!this.#dirty) return
        await mkdir(dirname(this.#file), { recursive: true })
        await writeFile(join(this.#file), JSON.stringify([...this.#map]))
        await rename(this.#file, `${this.#file}.bak`)
        this.#dirty = this.#options.debug
    }

    async load() {
        return readFile(this.#file, 'utf8')
    }

    static count() {
        return Store.#count
    }
}
```

- object keys, destructuring, class fields and named imports are A–Z, case-insensitive
- the constructor is always the first class member; methods keep the order you wrote them in
- two or more named imports go one per line, with a trailing comma
- keep an object unsorted where its key order is visible to the outside — e.g. the columns of a `console.table`,
  or JSON that something else parses by position

> **Heads-up:** Prettier puts short imports back on one line (`import { mkdir, readFile } from '…'`), which the
> sorting extra then reports. If you run Prettier on save, expect to re-expand those imports — Prettier has no
> option to keep them apart. Everything else in the sorting extra works together with Prettier.

### Aliases

Deep relative paths break the moment you move a file. Node's
[subpath imports](https://nodejs.org/api/packages.html#subpath-imports) give every folder a stable name.

```text
my-app/
  io/utils.js
  utils/fileUtils.js
  workers/persist/recorder.js
  package.json
```

```json
// package.json
{
    "imports": {
        "#io/*": "./io/*",
        "#utils/*": "./utils/*",
        "#workers/*": "./workers/*"
    }
}
```

```js
// ✗ without aliases — workers/persist/recorder.js
import fs from "fs";
import path from "path";
import { toJs } from "../../io/utils.js";
import { writeTextFile } from "../../utils/fileUtils.js";
import { createRecorder } from "./createRecorder.js";

export const save = async (file, state) => {
  const target = path.join("results", file);
  await writeTextFile(target, toJs(state));
  return fs.existsSync(target) ? createRecorder(target) : null;
};
```

```js
// ✓ with aliases — the same file, and it can now move anywhere
import fs from 'node:fs'
import path from 'node:path'
import { toJs } from '#io/utils.js'
import { writeTextFile } from '#utils/fileUtils.js'
import { createRecorder } from './createRecorder.js'

export const save = async (file, state) => {
    const target = path.join('results', file)
    await writeTextFile(target, toJs(state))
    return fs.existsSync(target) ? createRecorder(target) : null
}
```

- Node builtins carry the `node:` prefix
- an import that leaves its folder uses an alias; an import inside the same folder stays relative (`./…`)

### JSDoc

With the JSDoc extra, every function, class and method has a JSDoc block — and each block is written the
modern way:

```js
// ✗ with the JSDoc extra — every line below is reported
/**
 * computes the area of the rect
 * @param {{ width: number, height: number }} rect
 *
 * @param {Function} round
 * @returns {Array<number>}
 */
const areas = (rect, round) => [round(rect.width * rect.height)];

export class Grid {
  constructor(size) {
    this.size = size;
  }

  contains(point) {
    return point.x < this.size && point.y < this.size;
  }
}
```

```js
// ✓ with the JSDoc extra
/**
 * @typedef {Object} Rect
 * @property {number} height
 * @property {number} width
 */

/**
 * Area of `rect`, rounded.
 *
 * @param {Rect} rect
 * @param {(value: number) => number} round
 * @returns {number[]}
 */
const areas = (rect, round) => [round(rect.width * rect.height)]

/** A square grid of `size` × `size` cells. */
export class Grid {
    /**
     * @param {number} size cells per side
     */
    constructor(size) {
        this.size = size
    }

    /**
     * Whether `point` lies inside the grid.
     *
     * @param {Point} point
     * @returns {boolean}
     */
    contains(point) {
        return point.x < this.size && point.y < this.size
    }
}
```

- every function, class and method has a JSDoc block
- the main description is a sentence: capital first letter, ending with a period
- no inline object types like `{{ width: number }}` — a named `@typedef` instead
- no bare `{Function}` — write the signature
- arrays as `T[]`, not `Array<T>`
- every parameter has a matching `@param`, and there are no blank lines between the tags

In TypeScript files the extra drops JSDoc types, since TypeScript already has them.

### Hand-applied extras

Some habits make a real difference but no tool can check them. They are the last step of the modern coding
style — applied by hand, in code review, or not at all.

#### Parameters in order: required A–Z, then optional A–Z

```js
// ✗ before
const createUser = (name, email, id, role = "member", active = true) => ({
  active,
  email,
  id,
  name,
  role,
});

createUser("Ada", "ada@example.com", 7);
createUser("Linus", "linus@example.com", 8, "admin", false);
```

```js
// ✓ hand-applied
const createUser = (email, id, name, active = true, role = 'member') => ({ active, email, id, name, role })

createUser('ada@example.com', 7, 'Ada')
createUser('linus@example.com', 8, 'Linus', false, 'admin')
```

Every call site follows. Optional parameters stay at the end, so they can still be left out. Leave the order
alone where someone else decides it: callbacks (`map`, `sort`, `then`, event listeners), a `Map`-style
`set(key, value)`, and memoized functions whose cache key is built from the arguments.

#### Long lines broken at natural points

```js
// ✗ before
if (lastEntry && lastEntry.endAt >= this.pseudoGoal && lastEntry.status !== "done" && !this.stalled) {
  throw new Error(`Segment ${JSON.stringify(lastEntry)} is not equal to entry ${JSON.stringify(stateEntry)}`);
}
const rate = iterationsRateAt(this.endRate, startPosition, this.pseudoGoalNumberOfIterations, this.startRate);
```

```js
// ✓ hand-applied
if (lastEntry &&
    lastEntry.endAt >= this.pseudoGoal &&
    lastEntry.status !== 'done' &&
    !this.stalled) {
    throw new Error(`Segment ${JSON.stringify(lastEntry)} ` +
        `is not equal to entry ${JSON.stringify(stateEntry)}`)
}
const rate = iterationsRateAt(
    this.endRate,
    startPosition,
    this.pseudoGoalNumberOfIterations,
    this.startRate,
)
```

Break after `&&` / `||`, put one argument per line, and split a long template string with `+`. A
too-long end-of-line comment moves onto its own line above the code.

#### Aligned end-of-line comments keep their columns

```js
// ✓ hand-applied
const TIMEOUT = 30_000    // milliseconds per request
const RETRIES = 3         // attempts before giving up
const BACKOFF = 1.5       // delay multiplier between attempts
```

No other place in the code gets extra spaces — only these comment columns.

#### A blank line between top-level blocks

```js
// ✗ before
const createPool = (size) => {
  return new Array(size);
};
const dropPool = (pool) => {
  pools.delete(pool);
};
```

```js
// ✓ hand-applied
const createPool = size => new Array(size)

const dropPool = pool => {
    pools.delete(pool)
}
```

#### Fixed module constants in UPPER_CASE, numbers in comments written for humans

```js
// ✗ before
const maxBase = 65536;
const rulerWidth = 140;
// the table holds 10000 entries

// ✓ hand-applied
const MAX_BASE = 65_536
const RULER_WIDTH = 140
// the table holds 10,000 entries
```

#### An alias for every folder

Give every top-level folder a `#Folder/*` alias in `package.json`. A nested folder gets its own alias as soon
as something outside its parent folder imports it:

```json
{
    "imports": {
        "#BaseAccommodate/*": "./MultiplicativePersistence/BaseAccommodate/*",
        "#MultiplicativePersistence/*": "./MultiplicativePersistence/*",
        "#utils/*": "./utils/*"
    }
}
```

#### JSDoc that reads like a table

```js
// ✗ before
/**
 * This function takes the segment and, after checking whether it is done, loops over
 * the neighbours to merge them. It was added when we moved to segments.
 *
 * @param {Object} params
 * @param {bigint} params.base
 *     the numeric base the search runs in
 *
 * @param {bigint} params.pseudoGoal
 */

// ✓ hand-applied
/**
 * Merges the entry in place with its `'done'` neighbours.
 *
 * @param {SegmentsManagerParams} params
 */
```

- descriptions are short and exhaustive: what it is and what it holds — never how it works or its history
- one line per tag, with the description on the tag line
- every shape is a named `@typedef`, kept in one shared file, sorted A–Z; typedefs are global, never
  re-imported with `import()`
- a deliberate type mismatch (mostly in tests) gets an inline cast inside the parentheses:
  `assert.throws(() => shiftLeft(/** @type BigInt (Only for the inspections) */ 3))`

#### Code comments: one line, what or why

```js
// ✗ before
// We used to clone the object with spread here, but benchmarks showed that V8 makes the
// call site megamorphic, so after a long investigation we switched to copying by name.
return { additionSum: results.additionSum, steps: results.steps };

// ✓ hand-applied
// Copy the fields by name for performance.
return { additionSum: results.additionSum, steps: results.steps }
```

---

## Turning a rule off

Every rule can be switched off like in any flat config:

```js
import glorification from '@glorification/eslint-config'

export default [
    ...glorification,
    {
        rules: {
            'no-console': 'off',
        },
    },
]
```

---

## TypeScript

```bash
npm i -D typescript typescript-eslint
```

```js
// eslint.config.js
import glorification from '@glorification/eslint-config'
import ts from '@glorification/eslint-config/ts'

export default [...glorification, ...ts]
```

The TypeScript layer swaps the core rules for their type-aware twins (`no-shadow`, `no-unused-vars`,
`no-use-before-define`).

---

## Editor setup

### WebStorm / IntelliJ

1. *Settings → Languages & Frameworks → JavaScript → Prettier* — **Automatic Prettier configuration**,
   check **Run on save**.
2. *Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint* — **Automatic ESLint
   configuration**, check **Run eslint --fix on save**.
3. *Settings → Tools → Actions on Save* — uncheck **Reformat code** and **Optimize imports** (they would fight
   Prettier and ESLint).
4. *Settings → Editor → Code Style* — check **Enable EditorConfig support**.

Restart the IDE after installing the packages the first time — it caches both configs.

### VS Code

```json
// .vscode/settings.json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
}
```

### EditorConfig

Copy this `.editorconfig` next to your `package.json` so every editor agrees before the tools even run:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 4
indent_style = space
insert_final_newline = true
max_line_length = 120
trim_trailing_whitespace = true
```

---

## Why a modern coding style needs a linter

A style that lives in people's heads drifts. A style that lives in a config is applied on every save, in every
file, by every contributor, forever. Glorification turns a modern coding style into something a machine checks —
so reviews talk about what the code does, not how it looks.

---

## Requirements

- Node.js **20.19+ / 22.13+ / 24+** (ESLint 10)
- ESLint **9 or 10** (flat config)
- Prettier **3**
- For TypeScript: `typescript-eslint` **8** and TypeScript **5 – 6.0**
- For the sorting extra: `eslint-plugin-perfectionist` **5**

---

## Contributing

```bash
npm install
npm run lint
```

---

## Have a good productive day :)

If you like this package please consider donation <a href="https://paypal.me/ItayMerchav?locale.x=en_US" target="_blank">Click Here</a>

MIT © Itay Merchav
