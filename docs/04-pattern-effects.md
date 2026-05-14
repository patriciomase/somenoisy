# 04 — Pattern effects (transforms)

Source: <https://strudel.cc/workshop/pattern-effects/>

Effects that operate on the *pattern* itself, not the sound. These are where Tidal's pattern algebra really shines.

> Note: the fetch for this page came back thin. The handful of transforms below are confirmed from the page;
> the workshop almost certainly covers more (`fast`, `slow`, `every`, `struct`, `chop`, `ply` variants…).
> **Revisit the page** when you want to fill this in.

---

## Confirmed transforms

| Function | What it does |
|---|---|
| `.rev()` | Reverse the pattern within each cycle. |
| `.jux(fn)` | Split L/R: original on left channel, `fn(pattern)` on right. Great for stereo motion. |
| `.add("…")` | Add numbers/notes to a numeric pattern. Can be chained multiple times. |
| `.ply(n)` | Repeat each event `n` times within its slot ("speed up each event"). Supports patterning: `.ply("<1 2 1 3>")`. |
| `.off(time, fn)` | Lay a delayed, transformed copy of the pattern over the original. `time` is a fraction of a cycle, `fn` is a pattern transformation. Nestable. |

## Verbatim examples

```js
// reverse
n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").rev()

// stereo split with a reverse on the right
n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").jux(rev)

// add — transpose patterns
note("c2 [eb3,g3]".add("<0 <1 -1>>"))
  .color("<cyan <magenta yellow>>")
  // …rest of the example from the page…

// ply — multiply each event
sound("hh hh, bd rim [~ cp] rim").bank("RolandTR707").ply(2)

// off — delayed transformed copy laid over the original
n("0 [4 <3 2>]…")
  .off(1/16, x => x.add(4))
  .scale("<C5:minor …>")
```

## Composition

Transforms compose via method chaining. Each call returns a new pattern, so stacking is just:

```js
pattern.fast(2).jux(rev).every(4, x => x.add(7))
```

## TODO — fill in from the page

- [ ] `fast` / `slow` — tempo-multiply
- [ ] `every(n, fn)` — apply `fn` every n cycles
- [ ] `struct("…")` — impose a rhythm structure on a melodic pattern
- [ ] `chop(n)` — slice samples into n pieces
- [ ] More on `jux` variants and conditional transforms
