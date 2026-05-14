# 03 — First effects

Source: <https://strudel.cc/workshop/first-effects/>

How to shape what a pattern *sounds like* — filters, space, dynamics.

> Note: the doc-fetch for this page came back lighter on verbatim code than first-notes/first-sounds.
> The conceptual list is solid, but **revisit the page itself** to copy more worked examples.

---

## Effect functions

| Function | What it does | Typical range |
|---|---|---|
| `.gain(x)` | Amplitude / volume — also pattern-able for rhythmic dynamics | 0–1 |
| `.lpf(hz)` | Low-pass filter cutoff — lower = darker | ~200–5000 Hz |
| `.hpf(hz)` | High-pass filter cutoff | similar |
| `.vowel("a")` | Formant filter — vowel shape | `a` `e` `i` `o` |
| `.delay(x)` or `.delay("time:feedback:decay")` | Echo | 0–1 components |
| `.room(x)` | Reverb amount | 0–1 |
| `.pan(x)` | Stereo position | 0 (L) – 1 (R) |
| `.speed(x)` | Sample playback speed; negative reverses | any |
| `.attack`, `.decay`, `.sustain`, `.release` | ADSR envelope shaping | typically 0–1 |
| `.adsr("a:d:s:r")` | ADSR shorthand | e.g. `.adsr(".1:.1:.5:.2")` |

## Chaining

Effects are method-chained directly onto a pattern. Order matters for some effects but most behave as expected:

```js
note("…").sound("…").gain(0.7).lpf(800).room(0.4)
```

## Modulating effects with signals

Any numeric parameter can take a signal instead of a constant:

- Waveforms: `sine`, `saw`, `square`, `tri`, `rand`, `perlin`
- Oscillate 0–1 by default
- `.range(min, max)` sets output range
- `.slow(n)` / `.fast(n)` controls the LFO speed (in cycles)

## Verbatim examples

```js
// static low-pass
note("c3").sound("sawtooth").lpf(800)

// patterned low-pass — cutoff sequence
note("c3").sound("sawtooth").lpf("200 1000 200 1000")

// LFO on the filter — sine sweep over 4 cycles
note("c3").sound("sawtooth").lpf(sine.range(100, 2000).slow(4))
```

## TODO — revisit page for more examples

- [ ] Reverb + delay combos
- [ ] `vowel` patterns
- [ ] `gain` as rhythmic accent
- [ ] ADSR with synth sounds
