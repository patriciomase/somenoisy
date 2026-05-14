# 13 — Tonal functions (scales, chords, transpose)

Source: <https://strudel.cc/learn/tonal/>

Music-theory helpers — turning numbers into pitched material in a key, building chord voicings, transposing.

> The Strudel doc-fetch was light here; the page covers more than this slice. Re-read the page when you want depth on chord dictionaries / voicing modes.

---

## `scale(name)`

Turns numbers (via `n()`) into notes in a scale (zero-indexed), OR quantizes free notes to a scale.

- Format: `ROOT[OCTAVE]:MODE` — replace any spaces with colons.
- Root defaults to **octave 3** if not specified.

```js
n("0 2 4 6 4 2").scale("C:major")

// Free-running random quantized to a Japanese mode
n(rand.range(0,12).segment(8)).scale("C:ritusen").s("piano")
```

Common scale names: `major`, `minor`, `harmonic minor`, `melodic minor`, modes (`dorian`, `mixolydian`, `lydian`, `phrygian`, `locrian`), pentatonic variants, plus a long tail from `tonaljs` (`bebop`, `ritusen`, …).

---

## `transpose(semitones)`

Shifts all notes by a number of semitones. Supports numeric values and scientific interval notation (e.g. `"P5"`, `"M3"`).

## `scaleTranspose(steps)`

Moves notes by **scale degrees** within the active scale — so the result stays diatonic.

```js
note("…").scale("C4 bebop major")
  .scaleTranspose("<0 -1 -2 -3 -4 -5 -6 -4>")
```

---

## Chords

### `voicing()`

Resolve chord symbols into voicings using `tonaljs`.

```js
n("0 1 2 3").chord("<C Am F G>").voicing()
```

`voicing()` accepts a config object:

| Option | Purpose |
|---|---|
| `chord` | Chord symbol (e.g. `C`, `Am`, `G7`, `Bb^7`) — required |
| `dict` | Voicing dictionary (default available) |
| `anchor` | Reference note for alignment |
| `mode` | Alignment method: `below`, `duck`, `above` |
| `offset` | Integer shift in the voicing list |
| `n` | Treat the voicing as a scale; overshooting wraps octaves |

### `rootNotes(octave = 2)`

Extract chord roots as plain notes — useful for basslines:

```js
x => x.rootNotes(2).note().s('sawtooth').cutoff(800)
```
