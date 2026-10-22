# Changelog

## 0.1.3

### Fixed

- `eslint-config`: ESLint crashed ("node with invalid interface loaded as resolver") when a file
  imported certain packages, e.g. `vite`. import-x now uses its built-in node resolver instead of
  falling back to the uninstalled legacy one.

## 0.1.2

### Fixed

- Flag rule (`x === true`) no longer reports the string `'true'`.

### Changed

- Hex, binary and octal numbers need `_` separators only if they already use them.
- Turned off: `no-return-assign`, `guard-for-in`, `no-nested-ternary`, `no-sequences`.
- README: "Make it yours: add or turn off rules" section; `homepage` set.

## 0.1.1

- README badges, links and the optional extras (`/sorting`, `/aliases`, `/jsdoc`).

## 0.1.0

- First release: `@glorification/eslint-config` and `@glorification/prettier-config`.
