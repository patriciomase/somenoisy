# 16 — Strudel vs. TidalCycles

Source: <https://strudel.cc/learn/strudel-vs-tidal/>

If you know Tidal, this is what changes. If you don't, this is what you're inheriting (and what you're not).

---

## Language

Strudel is **JavaScript**, Tidal is **Haskell**. The shapes of patterns are the same; the punctuation is different.

Tidal relies on infix operators (`$`, `#`, `||+`, …) that JS doesn't have. The translation rule:

> `foo x $ bar x` → `bar(x).foo(x)` — reverse the flow, chain methods.

Side-by-side example:

```haskell
-- Tidal
iter 4 $ every 3 (||+ n "10 20") $ (n "0 1 3") # s "triangle"
```

```js
// Strudel
n("0 1 3").every(3, add.squeeze("10 20")).iter(4).s("triangle")
```

(Useful aside: this is also the strongest evidence that `every` *does* exist as a Strudel function — even though the reference pages I scraped didn't surface it.)

---

## Operator mappings

| Operation | Tidal | Strudel |
|---|---|---|
| Add | `\|+ n` | `.add(n)` |
| Subtract | `\|- n` | `.sub(n)` |
| Multiply | `\|* n` | `.mul(n)` |

Tidal's directional pipe variants (`\|+`, `+\|`, `\|+\|`) become explicit `.in()` / `.out()` / `.mix()` suffixes in Strudel.

---

## Audio engine

- **Tidal**: typically driven through **SuperDirt + SuperCollider**.
- **Strudel**: ships a **Web Audio** engine that runs standalone in the browser.
- Strudel **also** supports SuperDirt via `.osc()` (see `14-midi-io.md`) for hybrid setups.
- Strudel's sampler is a **subset** of SuperDirt's capabilities and loads from URLs, not disk paths.

---

## Other notable differences

| Topic | Strudel | Tidal |
|---|---|---|
| Default tempo | 1 cycle/sec | 0.5625 cycles/sec |
| Block evaluation in REPL | Not supported | Supported in editors like Emacs/Atom |
| Function coverage | A subset of Tidal — gaps tracked on GitHub | Reference implementation |

---

## Takeaway

If you're learning fresh: Strudel is the friendlier on-ramp. The pattern language is the same idea, you just write it in a curly-brace ecosystem and run it in the browser with no setup. The Tidal docs are still a useful secondary reference — most concepts translate.
