# CLAUDE.md

## What this package is

`@heathmont/money` is a thin arithmetic wrapper. It contains **no currency data of its own** —
[src/index.ts](src/index.ts) is the entire library and reads every currency, unit, precision and
shift out of `@heathmont/money-config`.

Consequence: **you cannot add, rename or fix a currency in this repo.** That work happens in
[coingaming/currency-config](https://github.com/coingaming/currency-config) — which publishes
`@heathmont/money-config` — and arrives here only as a dependency bump.

The dependency is pinned to an exact version (no `^`) in [package.json](package.json), so a new
money-config release is never picked up automatically.

Toolchain: node 18.18.0 via asdf ([.tool-versions](.tool-versions)). Run
`asdf install nodejs 18.18.0` if `npm` reports "No version is set for nodejs".

## Publishing to npm

Prerequisites: node 18.18.0 active, `npm whoami` returns your account, and that account is a
maintainer of `@heathmont/money`.

1. Bump the money-config version in [package.json](package.json) — exact pin, no range.
2. Run `npm install` to refresh [package-lock.json](package-lock.json). **Never hand-edit the
   lockfile.** Editing only `package.json` leaves the lockfile recording the old dependency, which
   makes `npm ci` fail outright on the mismatch.
3. Add or extend assertions in [src/index.spec.ts](src/index.spec.ts) covering the new currency —
   e.g. `expect(getInputPrecision('GRAM')).toBe(8)`.
4. `npm test`.
5. Open a PR. [CODEOWNERS](CODEOWNERS) requires review from @hypno2000 / @mlamp. Merge to `master`.
6. From an up-to-date `master`, bump the version: `npm version patch`. This bumps `package.json`
   and the lockfile, commits as `<version>` (e.g. `2.4.25`), and creates tag `v<version>` — which
   is why release commits in the log are bare version numbers. Keep the version bump as its own
   commit, separate from the dependency change.
7. `npm publish`. Two lifecycle hooks fire automatically:
   - `prepack` → `npm run compile` (`tsc -p ./` → `dist/`)
   - `postpublish` → `git push --follow-tags`
8. **Confirm the release tag exists on the remote** — releases are only findable by tag, and this is
   the step that gets skipped:

   ```bash
   git tag --points-at HEAD                     # expect v<version>
   git ls-remote --tags origin | grep v<version>  # expect a match
   ```

   If either comes back empty, tag it by hand and push:

   ```bash
   git tag v<version> && git push origin v<version>
   ```

   Note `npm version patch` already creates `v<version>` locally, and `postpublish` pushes it with
   `git push --follow-tags` — so on the happy path this is a check, not a command, and a bare
   `git tag` will fail with *tag already exists*. The tag goes missing when the version was bumped
   by hand-editing `package.json` instead of running `npm version`, which creates no tag at all.
   That is exactly how `money-config` 2.3.26 reached npm with no `v2.3.26` tag behind it.
9. Verify the publish: `npm view @heathmont/money version`.

### Release notes and gotchas

- A `publish-minor` script exists, but every recent release has been a patch. Use
  `npm version patch` + `npm publish`; run `npm run publish-minor` only for a genuine minor bump.
- `dist/` is **committed** (`dist/index.js`, `.d.ts`, `.js.map`). `prepack` regenerates it, but
  commit the result so the tree doesn't carry stale build output.
- [circle.yml](circle.yml) is legacy CircleCI 1.0: tests are stubbed to `echo "Testing skipped"`
  and every `deployment` block is commented out. There is no CI publish — releases are manual from
  a local checkout.
- `findConfig` uses `Object.assign(unitConfig, …)`, which mutates the object imported from
  money-config. Harmless today because `precision` is constant per currency, but don't rely on the
  imported config being immutable.
