# 05 — Workshop recap

Source: <https://strudel.cc/workshop/recap/>

End of the introductory workshop. Mostly a checkpoint — what you've covered:

- **Mini-notation** for sequencing sounds and notes (spaces, brackets, `*`, `/`, `<>`, `,`, …)
- **Sound selection** via samples (`sound`, `s`) and synths
- **Effects** chained onto patterns (`gain`, `lpf`, `delay`, `room`, …)
- **Pattern transforms** (`rev`, `jux`, `fast`, `ply`, `off`, …)
- **Tempo** (`setcpm`)

Quick examples the page recaps:

```js
sound("bd bd sd hh bd cp sd hh")     // basic sequencing
note("c <e g>")                       // alternating pitches
s("bd rim bd cp").delay(.5)           // applying effects
sound("bd sd [~ bd] sd").fast(2)      // pattern speed modification
```

The page itself doesn't prescribe a next step — beyond here, the deeper docs live under `/learn/`. We've started covering them in `06-mini-notation.md`, `07-effects-reference.md`, and `07-synths.md`.
