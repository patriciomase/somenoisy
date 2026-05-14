# 17 — Code and workflow

Source: <https://strudel.cc/learn/code/>

The thin layer of JavaScript-side mechanics that show up when writing Strudel patches.

> The `/learn/code/` page is intentionally minimal — it states that what's there "covers most of the JavaScript syntax needed for Strudel." Deeper JS is assumed.

---

## Editor shortcuts (what's documented)

- **`Cmd/Ctrl + /`** — toggle line comments. Handy for muting parts of a piece live.

> The page **doesn't** list the canonical evaluate/stop shortcuts. In practice (from the REPL UI):
> - `Ctrl/Cmd + Enter` — evaluate
> - `Ctrl/Cmd + .` — silence/stop
> Worth confirming from the REPL's own help once you open it.

---

## Comments

- `//` line comments — disable a line/block.
- Metadata comments use the `@` prefix at the top of a file: `@by`, `@license`, etc. — convention for crediting/licensing patches.

---

## String types

| Quote | Behavior |
|---|---|
| `"…"` (double) | Parsed as **mini-notation** — pattern-aware |
| `'…'` (single) | Plain JS string — **not** parsed |

This matters: `note('C minor')` is just the literal string `"C minor"`, while `note("C minor")` would try to parse it as a pattern.

---

## Defining reusable transforms

Use `register()` to name a transformation that can be chained like any built-in:

```js
const effectChain = register('effectChain', (pat) => pat
  .s("sawtooth")
  .cutoff(500)
  .room(0.5)
)

// then:
note("c e g").effectChain()
```

This is the official way to extract a chord of effects you keep retyping.

---

## What's not on this page

The `/learn/code/` page is bare-bones. Things you'll want but won't find here:

- `setcpm()` / tempo controls — covered implicitly throughout the workshop docs
- Stop / halt mechanisms beyond `hush()` (see `09-conditional-modifiers.md`)
- General REPL keyboard shortcuts beyond comment toggling
- Variable scoping rules (Strudel evaluates the editor buffer as a script)
- Visualization helpers like `_scope()`, `_pitchwheel()`, `_spiral()` — these appear in workshop/synths examples but I couldn't find a dedicated doc page (the obvious `/learn/visuals/` URL 404s)

If you need any of those, the source on GitHub or asking in the Strudel Discord are probably faster than the docs.
