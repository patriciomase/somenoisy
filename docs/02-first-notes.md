# 02 — First notes

Source: <https://strudel.cc/workshop/first-notes/>

Pitched material — how to play notes, not just samples.

---

## Functions

| Function | What it does |
|---|---|
| `note("…")` | Set pitch. Accepts MIDI numbers, letter names with optional accidentals, and octaves. |
| `n("…")` | Scale-degree numbers — interpreted via `.scale()`. Also used for sample indices (context-dependent). |
| `.scale("C:major")` | Interprets `n()` as scale degrees. Format `ROOT[OCTAVE]:MODE` (e.g. `A2:minor`, `D:dorian`, `G:mixolydian`). |
| `.sound("piano")` | Assign instrument: synths (`sawtooth`, `square`, …) or GM patches (`gm_electric_guitar_muted`, `gm_acoustic_bass`, …). |
| `.bank("RolandTR909")` | Swap drum-machine bank for sample sounds. |

## Writing pitches

- **MIDI numbers** — `note("48 52 55 59")`
- **Letter names** — `note("c e g b")`
- **Accidentals** — flats `db eb gb ab bb`, sharps `c# d# f# g# a#`
- **Octaves** — append a digit, octaves 1–8: `note("c2 e3 g4 b5")`
- **Scale degrees** — `n("0 2 4 6 8").scale("C:minor")`

## Note-specific mini-notation

| Symbol | Meaning |
|---|---|
| `/n` after a group | Spread group across n cycles — `[36 34 41 39]/4` |
| `< … >` | One element per cycle (equivalent to `[…]/n`) |
| `@n` | Elongate — `c@3 eb` makes `c` last 3× as long as `eb` |
| `!n` | Replicate value — `c!2 e` = `c c e` |
| `*n` | Speed up / replicate pattern — `[6,8]*4` |
| `$:` prefix | Play multiple parallel patterns (multi-line stack) |

## Worked examples (verbatim)

```js
note("48 52 55 59").sound("piano")
note("c e g b").sound("piano")
note("db eb gb ab bb").sound("piano")
note("c# d# f# g# a#").sound("piano")
note("c2 e3 g4 b5").sound("piano")

// stacked chord + melody on one instrument
note("36 43, 52 59 62 64").sound("piano")

// two instruments — interleaved vs. stacked
note("48 67 63 [62, 58]").sound("piano gm_electric_guitar_muted")
note("48 67 63 [62, 58]").sound("piano, gm_electric_guitar_muted")

// slow bassline: pattern stretched across 4 cycles
note("[36 34 41 39]/4").sound("gm_acoustic_bass")
note("<36 34 41 39>").sound("gm_acoustic_bass")
note("<[36 48]*4 [34 46]*4 [41 53]*4 [39 51]*4>").sound("gm_acoustic_bass")

// melody over an alternating cycle
note("60 <63 62 65 63>").sound("gm_xylophone")

// scale degrees + alternating scales
setcpm(60)
n("0 2 4 <[6,8] [7,9]>").scale("C:minor").sound("piano")
n("<0 -3>, 2 4 <[6,8] [7,9]>").scale("<C:major D:mixolydian>/4").sound("piano")

// elongate / replicate
note("c@3 eb").sound("gm_acoustic_bass")
note("c!2 [eb,<g a bb a>]").sound("piano")

// bassline with low-pass filter (preview of effects)
note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
  .sound("gm_synth_bass_1").lpf(800)

// nested elongation across mode changes
setcpm(60)
n("<[4@2 4] [5@2 5] [6@2 6] [5@2 5]>*2")
  .scale("<C2:mixolydian F2:mixolydian>/4")
  .sound("gm_acoustic_bass")

// a fuller string pattern
n(`<[~ 0] 2 [0 2] [~ 2] [~ 0] 1 [0 1] [~ 1]
   [~ 0] 3 [0 3] [~ 3] [~ 0] 2 [0 2] [~ 2]>*4`)
  .scale("C4:minor").sound("gm_synth_strings_1")
```
