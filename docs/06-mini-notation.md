# 06 — Mini-notation reference

Source: <https://strudel.cc/learn/mini-notation/>

The complete mini-notation cheat sheet. Operators apply inside the quoted pattern string passed to `note(...)`, `sound(...)`, `n(...)`, etc.

> **Core idea:** the contents of one quoted string occupy **one cycle**. Adding more events divides their durations proportionally. Operators like `*`, `/`, `<>` change how events are distributed across cycles.

---

## Operator reference

| Symbol | Meaning | Example |
|---|---|---|
| (space) | Event separator within a sequence | `note("c e g b")` |
| `[ … ]` | Group events into a sub-sequence (fits inside one slot) | `note("e5 [b4 c5] d5 [c5 b4]")` |
| `*n` | Speed up / replicate the preceding group | `note("[e5 b4 d5 c5]*2")` |
| `*x.y` | Fractional speed multiplier | `note("[e5 b4 d5 c5]*2.75")` |
| `/n` | Slow / spread the preceding group over n cycles | `note("[e5 b4 d5 c5]/2")` |
| `/x.y` | Fractional slow factor | `note("[e5 b4 d5 c5]/2.75")` |
| `< … >` | One element per cycle (length = event count) | `note("<e5 b4 d5 c5>")` |
| `< … >*n` | Combine with multiply for tighter cycling | `note("<e5 b4 d5 c5 a4 c5>*8")` |
| `,` | Stack — parallel events / chords | `note("[g3,b3,e4]")` |
| `@n` | Elongate — give an event temporal weight `n` | `note("<[g3,b3,e4]@2 [a3,c3,e4]>*2")` |
| `!n` | Replicate without speeding up | `note("<[g3,b3,e4]!2 [a3,c3,e4]>*2")` |
| `~` | Rest / silence | `note("[b4 [~ c5] d5 e5]")` |
| `-` | Alternative rest notation (same as `~`) | `sound("metal - jazz")` |
| `?` | 50% chance the event is dropped | `note("[g3,b3,e4]*8?")` |
| `?0.x` | Custom probability of removal (0–1) | `note("[g3,b3,e4]*8?0.1")` |
| `\|` | Random choice between alternatives | `note("[g3,b3,e4] \| [a3,c3,e4]")` |
| `(beats, segments)` | Euclidean rhythm | `s("bd(3,8)")` |
| `(beats, segments, offset)` | Euclidean with phase offset | `s("bd(3,8,3)")` |
| `` ` … ` `` | Backtick string for multi-line patterns | (encloses whole pattern) |
| `" … "` | Standard quoted pattern | `note("c e g b")` |
| `' … '` | Single quotes — treated as literal, not parsed as mini-notation | (rarely used in patterns) |
| `:n` | Sample index suffix (used inside `sound`/`s`) | `sound("hh:0 hh:1")` |

---

## Mental model

Think of the pattern string as a sequence laid across one cycle:

- A flat sequence `"a b c d"` divides the cycle into 4 equal slots.
- `[a b]` inside one slot subdivides that slot.
- `*n` and `/n` change how many cycles the pattern uses.
- `<>` is the natural "one per cycle" form — equivalent to `[…]/n` where n = number of items.
- `,` stacks parallel layers without consuming extra time.
- `@`/`!` adjust weighting/repetition without changing total duration.

When in doubt: count slots. Every operator just changes either *how many slots there are* or *how long each one is*.
