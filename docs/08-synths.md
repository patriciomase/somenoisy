# 08 — Synths

Source: <https://strudel.cc/learn/synths/>

Built-in oscillators and the parameters that shape them. For sample-based sounds, see the workshop notes (`01`/`02`); this page is purely about synthesis.

---

## Built-in oscillators

| Category | Names |
|---|---|
| Basic waveforms | `sine`, `sawtooth`, `square`, `triangle` (`triangle` is the default when `note()` is used without `.sound()`) |
| Noise | `white`, `pink`, `brown`, `crackle` |
| ZZFX variants | `z_sawtooth`, `z_tan`, `z_noise`, `z_sine`, `z_square` |
| Custom | `user` — pair with `.partials([...])` for hand-built waveforms |
| Wavetable | `wt_*` names (1000+ AKWF waveforms available by default — load via `samples('bubo:waveforms')`) |

---

## Parameters

| Parameter | Aliases | What it does |
|---|---|---|
| `sound` / `s` | — | Pick oscillator/synth name |
| `noise` | — | Mix in noise on top of any oscillator |
| `density` | — | Crackle density (for `crackle`) |
| `partials` | — | Array of harmonic magnitudes — additive synthesis |
| `phases` | — | Array of harmonic phases |
| `vib` / `vibrato` / `v` | — | Vibrato rate (Hz). Add `:depth` suffix for depth in semitones |
| `vibmod` / `vmod` | — | Vibrato depth (semitones) |
| `fm` | — | FM modulation amount |
| `fmh` | — | FM harmonicity ratio (modulator:carrier) |
| `fmattack` | `fmatt` | FM envelope attack |
| `fmdecay` | `fmdec` | FM envelope decay |
| `fmsustain` | `fmsus` | FM envelope sustain |
| `fmenv` | `fme` | FM envelope curve (`lin`/`exp`) |
| `loopBegin`, `loopEnd` | — | Wavetable scan range |
| `curve` | — | Waveshape (ZZFX, 1–3) |
| `slide` | — | Pitch slide (ZZFX) |
| `zmod` | — | FM speed (ZZFX) |
| `zcrush` | — | Bit crush 0–1 (ZZFX) |
| `tremolo` | — | LFO volume modulation (ZZFX) |

---

## Examples (verbatim)

```js
// alternating waveforms — using ._scope() to draw the waveform
note("c2 <eb2 <g2 g1>>".fast(2))
  .sound("<sawtooth square triangle sine>")
  ._scope()

// noise as hi-hat substitute
sound("bd*2,<white pink brown>*8")
  .decay(.04).sustain(0)._scope()

// additive synthesis — turn harmonics on/off
note("c2 <eb2 <g2 g1>>".fast(2))
  .sound("sawtooth")
  .partials([1, 1, "<1 0>", "<1 0>", "<1 0>", "<1 0>", "<1 0>"])
  ._scope()

// custom waveform — only specific harmonics
note("c2 <eb2 <g2 g1>>".fast(2))
  .sound("user")
  .partials([1, 0, 0.3, 0, 0.1, 0, 0, 0.3])
  ._scope()

// vibrato — rate, then rate:depth
note("a e").vib("<.5 1 2 4 8 16>")._scope()
note("a e").vib("<.5 1 2 4 8 16>:12")._scope()

// FM synthesis
note("c e g b g e")
  .fm(4)
  .fmh("<1 2 1.5 1.61>")
  ._scope()

// wavetable (requires the AKWF wavetable sample pack)
samples('bubo:waveforms');
note("<[g3,b3,e4]!2 [a3,c3,e4] [b3,d3,f#4]>")
  .n("<1 2 3 4 5 6 7 8 9 10>/2")
  .s('wt_flute')._scope()
```

---

## What's missing here

- The `/learn/synths/` page doesn't catalogue the **General MIDI / soundfont** names (`gm_acoustic_bass`, `gm_synth_strings_1`, `piano`, `gm_electric_guitar_muted`, …) we saw in the workshop. Those are **sample-based** instruments loaded from soundfonts, not the WebAudio synths covered here.
- TODO: find which page lists the GM patch names — likely under a samples/soundfonts section.
