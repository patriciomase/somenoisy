# 01 — Getting started with Strudel

Notes from the official workshop. Source pages linked at the top of each section.

---

## What Strudel is

> "With Strudel, you can expressively write dynamic music pieces. It is an official port of the Tidal Cycles pattern language to JavaScript."
> — <https://strudel.cc/workshop/getting-started/>

You don't need to know JavaScript or Tidal Cycles to use it. The canonical place to play is the REPL at <https://strudel.cc>.

> TODO: confirm keyboard shortcuts for evaluate/stop from the actual REPL docs — not on the getting-started page. (In practice it's `Ctrl+Enter` to evaluate, `Ctrl+.` to silence — verify.)

---

## First sounds

Source: <https://strudel.cc/workshop/first-sounds/>

### Core functions

| Function | What it does |
|---|---|
| `sound("name")` / `s("name")` | Plays a named sample. `s()` is just a shorthand. |
| `:n` suffix | Pick a specific sample inside a bank: `sound("casio:1")`. |
| `n("0 1 2")` | Pick sample numbers as a separate pattern — pairs with `.sound("bank")`. |
| `.bank("RolandTR909")` | Swap the drum-machine character of all the named hits. |
| `setcpm(x)` | Set tempo in **cycles per minute**. Default is 30 cpm — one cycle = 2 seconds. |

### Mini-notation cheat sheet

| Symbol | Meaning | Example |
|---|---|---|
| (space) | Sequence within one cycle | `"bd bd sd hh"` |
| `:n` | Select sample number | `"hh:0 hh:1"` |
| `-` or `~` | Rest / silence | `"metal - jazz"` |
| `< … >` | Alternate — one element per cycle | `"<bd hh rim oh>"` |
| `[ … ]` | Sub-sequence (fits inside one step) | `"bd [metal jazz] hh"` |
| `[[ … ]]` | Nested sub-sub-sequence | `"bd [metal [jazz sd]]"` |
| `*n` | Repeat / speed up | `"bd sd*2 cp*3"` |
| `,` | Stack — parallel patterns | `"bd*2, hh*2 [hh oh]"` |

### Worked examples (from the workshop, verbatim)

```js
sound("casio")
sound("casio:1")

sound("bd hh sd oh")
sound("bd hh sd oh").bank("RolandTR909")

// alternation vs sequence
sound("bd bd hh bd rim bd hh bd")
sound("<bd bd hh bd rim bd hh bd>")
sound("<bd bd hh bd rim bd hh bd>*8")

// tempo
setcpm(90/4)
sound("<bd hh rim hh>*8")

// rests
sound("bd hh - rim - bd hh rim")

// sub-sequences
sound("bd [hh hh] sd [hh bd] bd - [hh sd] cp")
sound("bd hh*2 rim hh*3 bd [- hh*2] rim hh*2")
sound("bd hh*32 rim hh*16")
sound("bd [[rim rim] hh] bd cp")

// stacking parallel patterns
sound("hh hh hh, bd casio")
sound("hh hh hh, bd bd, - casio")
sound("hh hh hh, bd [bd,casio]")

// multi-line stack
sound(`bd*2, - cp,
- - - oh, hh*4,
[- casio]*2`)

// picking sample numbers separately with n()
sound("jazz:0 jazz:1 [jazz:4 jazz:2] jazz:3*2")
n("0 1 [4 2] 3*2").sound("jazz")
```

---

## Up next

- [ ] First notes — pitched material, `note()`, scales
- [ ] Effects — `.gain`, `.lpf`, `.room`, `.delay`
- [ ] Pattern transforms — `.fast`, `.slow`, `.rev`, `.jux`, `.every`, `.struct`
- [ ] Loading custom samples with `samples()`
