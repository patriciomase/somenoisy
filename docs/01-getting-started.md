# 01 — Getting started with Strudel

Notes from working through <https://strudel.cc/workshop/getting-started>.

> Fill in as we go.

## What Strudel is

- A live-coding music environment that runs entirely in the browser.
- A JavaScript port / reimagining of TidalCycles' pattern language.
- Code is evaluated on the fly — change a line, hit `Ctrl+Enter`, the new pattern slots in on the next cycle.

## First sounds

```js
// minimal: a kick-snare loop
sound("bd sd")
```

## To explore

- [ ] Mini-notation basics: `~` (rest), `[ ]` (subdivide), `< >` (alternate), `,` (stack), `*` (repeat), `/` (slow)
- [ ] `note()` vs `sound()` vs `s()`
- [ ] Common transforms: `.fast`, `.slow`, `.rev`, `.jux`, `.every`, `.struct`
- [ ] Effects: `.gain`, `.lpf`, `.room`, `.delay`
- [ ] Samples — built-in banks vs `samples()` loader
