# 12 — Pattern factories

Source: <https://strudel.cc/learn/factories/>

Functions that **construct** patterns programmatically — alternatives to writing everything inside a quoted mini-notation string. Useful when you want JS values, computed lists, or explicit layering.

---

## Sequencing & layering

| Factory | Aliases | Behavior | Example |
|---|---|---|---|
| `cat` | `slowcat` | Concatenate — each item gets **one full cycle** | `cat("e5", "b4", ["d5", "c5"]).note()` |
| `seq` | `fastcat` | Concatenate — all items **compressed into one cycle** | `seq("e5", "b4", ["d5", "c5"]).note()` |
| `stack` | `polyrhythm`, `pr` | Play items simultaneously, equal length | `stack("g3", "b3", ["e4", "d4"]).note()` |
| `stepcat` | `timeCat` | Proportional concatenation — each item carries a step-weight | `stepcat([3, "e3"], [1, "g3"]).note()` |
| `arrange` | — | Lay out patterns across **multiple cycles** | `arrange([4, "<c a f e>(3,8)"], [2, "<g a>(5,8)"])` |
| `polymeter` | `pm` | Aligns by repeating to the LCM of step counts | `polymeter("c eb g", "c2 g2").note()` |
| `polymeterSteps` | — | Polymeter with explicit step count | `polymeterSteps(2, x, y, z)` |

## Numeric pattern builders

| Factory | Behavior | Example |
|---|---|---|
| `run(n)` | Sequence `0, 1, …, n−1` | `n(run(4)).scale("C4:pentatonic")` |
| `binary(n)` | Convert integer to binary digits as a pattern | `"hh".s().struct(binary(5))` |
| `binaryN(n, bits)` | Binary padded to `bits` digits (default 16) | `"hh".s().struct(binaryN(55532, 16))` |

## Special

| Name | Description |
|---|---|
| `silence` | Empty pattern. Equivalent to `"~"`. |

---

## When to reach for factories vs mini-notation

- **Mini-notation** is tighter for short rhythmic ideas (`"bd sd bd sd"`).
- **Factories** win when:
  - You want a computed list — `n(run(8))`
  - You want explicit layering — `stack(a, b, c)` reads cleaner than `[a, b, c]` glued into mini-notation
  - You want different items to span different cycle counts — `arrange`
  - You want polyrhythm/polymeter at the structural level
