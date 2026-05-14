# 09 — Conditional / structural modifiers

Source: <https://strudel.cc/learn/conditional-modifiers/>

Functions that apply a transformation conditionally, restructure patterns, or pick between alternatives.

> ⚠️ **Gap:** the page index lists `every`, `sometimes`, `sometimesBy`, `often`, `rarely`, `never`, `always` —
> the doc-fetch didn't surface their detail. The semantics in Tidal-land:
> - `every(n, fn)` applies `fn` every `n` cycles.
> - `sometimes(fn)` ≈ `sometimesBy(0.5, fn)` — applies `fn` with probability `p`.
> - `often`/`rarely` are `sometimesBy(0.75, ...)` / `sometimesBy(0.25, ...)`.
> - `always`/`never` are the degenerate cases (probability 1 / 0).
> Verify against the page when you need them.

---

## Time-based conditionals

| Function | Behavior | Example |
|---|---|---|
| `lastOf(n, fn)` | Apply `fn` on the **last** of every n cycles | `note("c3 d3 e3 g3").lastOf(4, x => x.rev())` |
| `firstOf(n, fn)` | Apply `fn` on the **first** of every n cycles | `note("c3 d3 e3 g3").firstOf(4, x => x.rev())` |

## Pattern-driven gating

| Function | Behavior | Example |
|---|---|---|
| `when(boolPat, fn)` | Apply `fn` whenever `boolPat` is truthy | `"c3 eb3 g3".when("<0 1>/2", x => x.sub("5")).note()` |
| `mask(pat)` | Silence the pattern where `pat` is 0/`~` | `note("c [eb,g] d [eb,g]").mask("<1 [0 1]>")` |
| `struct(pat)` | Force pattern to follow a rhythmic skeleton | `note("c,eb,g").struct("x ~ x ~ ~ x ~ x ~ ~ ~ x ~ x ~ ~").slow(2)` |
| `invert()` / `inv` | Flip 1↔0 in a binary pattern (good with `struct`) | `s("bd").struct("1 0 0 1 0 0 1 0".lastOf(4, invert))` |

## Chunking

| Function | Behavior | Example |
|---|---|---|
| `chunk(n, fn)` | Divide pattern into n parts; apply `fn` to one part per cycle, rotating | `"0 1 2 3".chunk(4, x => x.add(7)).scale("A:minor").note()` |
| `chunkBack(n, fn)` | Like `chunk` but rotates backward | `"0 1 2 3".chunkBack(4, x => x.add(7)).scale("A:minor").note()` |
| `fastChunk(n, fn)` | Chunks without repeating source cycles per chunk set | `"<0 8> 1 2 3 4 5 6 7".scale("C2:major").note().fastChunk(4, x => x.color('red')).slow(2)` |

## Pattern flow control

| Function | Behavior | Example |
|---|---|---|
| `reset(pat)` | Restart **current** cycle on each onset in `pat` | `s("[<bd lt> sd]*2, hh*8").reset("<x@3 x(5,8)>")` |
| `restart(pat)` | Restart from cycle 0 on each onset in `pat` | `s("[<bd lt> sd]*2, hh*8").restart("<x@3 x(5,8)>")` |
| `hush()` | Silence the pattern | `stack(s("bd").hush(), s("hh*3"))` |

## Picking from alternatives

| Function | Behavior | Example |
|---|---|---|
| `pick(idx, values)` | Pick from list/lookup by index or key | `note("<0 1 2!2 3>".pick(["g a", "e f", "f g f g", "g c d"]))` |
| `pickmod(idx, values)` | `pick` but wraps modulo list size | (same shape) |
| `pickF(idx, fns)` | Pick a **function** to apply | `s("bd [rim hh]").pickF("<0 1 2>", [rev, jux(rev), fast(2)])` |
| `pickmodF` | `pickF` with wrap | — |
| `pickRestart` | Like `pick` but restarts the chosen pattern | `"<a@2 b@2 c@2 d@2>".pickRestart({ a: n("0 1 2 0"), b: n("2 3 4 ~"), c: n("[4 5] [4 3] 2 0"), d: n("0 -3 0 ~") }).scale("C:major").s("piano")` |
| `pickReset` | Like `pick` but resets the chosen pattern | — |
| `pickmodRestart` / `pickmodReset` | Wrap-around variants | — |
| `inhabit` / `pickSqueeze` | Pick, squeezing chosen pattern to the index's duration | `let a = s("bd(3,8)"); let b = s("cp sd"); "<a b [a,b]>".inhabit({a, b})` |
| `squeeze(idx, values)` | Pick + compress to fit selecting event | `note(squeeze("<0@2 [1!2] 2>", ["g a", "f g f g", "g a c d"]))` |

## Arpeggiation

| Function | Behavior | Example |
|---|---|---|
| `arp(pat)` | Pick indices from stacked chord notes | `note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>").arp("0 [0,2] 1 [0,2]")` |
| `arpWith(fn)` 🧪 | Programmatic arpeggiation (experimental) | `note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>").arpWith(haps => haps[2])` |
