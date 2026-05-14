# 15 — Random / probability modifiers

Source: <https://strudel.cc/learn/random-modifiers/>

Probability-based pattern modifiers — drop events, swap values, conditionally apply transforms. Complements `10-signals.md` (which covers the continuous signal sources `rand`, `irand`, `perlin`, …).

---

## Choosing values

| Function | Behavior | Example |
|---|---|---|
| `choose(...xs)` | Pick randomly **per event** | `note("c2 g2!2 d2 f1").s(choose("sine", "triangle", "bd:6"))` |
| `wchoose([v, w], …)` | Weighted random per event | `s(wchoose(["sine",10], ["triangle",1], ["bd:6",1]))` |
| `chooseCycles(...xs)` / `randcat` | Pick once **per cycle** | `chooseCycles("bd", "hh", "sd").s().fast(8)` |
| `wchooseCycles([v, w], …)` / `wrandcat` | Weighted, per cycle | `wchooseCycles(["bd",10], ["hh",1], ["sd",1]).s().fast(8)` |

## Dropping events (degrade)

| Function | Behavior | Example |
|---|---|---|
| `degradeBy(p)` | Drop each event with probability `p` (0–1) | `s("hh*8").degradeBy(0.2)` |
| `degrade()` | `degradeBy(0.5)` | `s("hh*8").degrade()` |
| `undegradeBy(p)` | Inverse — keep with probability `p` | `s("hh*8").undegradeBy(0.2)` |
| `undegrade()` | `undegradeBy(0.5)` | `s("hh*8").undegrade()` |

## Conditionally applying transforms

The pattern is `pattern.modifier(fn)` — `fn` is a function from pattern to pattern.

| Function | Behavior | Example |
|---|---|---|
| `sometimesBy(p, fn)` | Apply `fn` with probability `p` per event | `s("hh*8").sometimesBy(.4, x => x.speed("0.5"))` |
| `sometimes(fn)` | `sometimesBy(0.5, fn)` | `s("hh*8").sometimes(x => x.speed("0.5"))` |
| `someCyclesBy(p, fn)` | Apply `fn` per cycle with probability `p` | `s("bd,hh*8").someCyclesBy(.3, x => x.speed("0.5"))` |
| `someCycles(fn)` | `someCyclesBy(0.5, fn)` | `s("bd,hh*8").someCycles(x => x.speed("0.5"))` |

### Probability shortcuts

| Shortcut | Equivalent to |
|---|---|
| `often(fn)` | `sometimesBy(0.75, fn)` |
| `rarely(fn)` | `sometimesBy(0.25, fn)` |
| `almostAlways(fn)` | `sometimesBy(0.9, fn)` |
| `almostNever(fn)` | `sometimesBy(0.1, fn)` |
| `always(fn)` | `sometimesBy(1, fn)` |
| `never(fn)` | `sometimesBy(0, fn)` (no-op) |

---

## Mental model

- **`choose` vs `chooseCycles`** — first picks fresh on every event, second pins one choice for the whole cycle. Big sonic difference.
- **`degrade` vs `sometimes`** — degrade *removes* events; `sometimes` *transforms* them. Compose freely.
- **Per-event vs per-cycle** is the recurring distinction across this whole family: `sometimes` vs `someCycles`, `choose` vs `chooseCycles`. Pick the right granularity.
