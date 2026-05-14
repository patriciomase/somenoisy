# Reference doc menu

Curated index over `docs/` (at the project root). When composing, **read only the doc the current task needs** — don't preload them all.

---

## By task

| If you need to… | Open |
|---|---|
| Recall what a mini-notation symbol means (`*`, `/`, `<>`, `[ ]`, `@`, `!`, `?`, `\|`, Euclidean `(b,s)`) | `docs/06-mini-notation.md` |
| Look up an **effect** (`lpf`, `room`, `delay`, `vowel`, distortion, phaser, sidechain, ADSR…) | `docs/07-effects-reference.md` |
| Pick or configure a **synth oscillator** (`sawtooth`, `square`, FM, partials, wavetable, vibrato) | `docs/08-synths.md` |
| Apply something **every n cycles**, or **conditionally** (`every`, `chunk`, `mask`, `struct`, `arp`, `pick*`) | `docs/09-conditional-modifiers.md` |
| Modulate a parameter continuously (`sine`, `saw`, `rand`, `perlin`, `.range()`, `.segment()`) | `docs/10-signals.md` |
| Load custom samples, use banks, manipulate sample playback (`chop`, `slice`, `striate`, `loopAt`, `speed`) | `docs/11-samples.md` |
| Build a pattern with code-level constructors (`stack`, `cat`, `seq`, `arrange`, `polymeter`, `run`, `binary`) | `docs/12-factories.md` |
| Work with **scales, chords, voicings, transpose** | `docs/13-tonal.md` |
| Send to / receive from **MIDI**, OSC, MQTT — `.midi()`, `midichan`, CC, sysex, midimaps | `docs/14-midi-io.md` |
| Random / probability modifiers (`sometimes`, `often`, `rarely`, `degrade`, `choose`, `wchoose`) | `docs/15-random-and-probability.md` |
| Comparing a Tidal snippet to its Strudel equivalent | `docs/16-strudel-vs-tidal.md` |
| Define a reusable transform with `register()`; understand comment metadata | `docs/17-code-and-workflow.md` |

---

## By Strudel function (alphabetical, partial)

Use as a fast lookup. Each row → the doc that has the full signature and examples.

| Function | Doc |
|---|---|
| `add`, `sub`, `mul` (pattern math) | `docs/16-strudel-vs-tidal.md` |
| `adsr`, `attack`, `decay`, `sustain`, `release` | `docs/07-effects-reference.md` |
| `arp`, `arpWith` | `docs/09-conditional-modifiers.md` |
| `arrange` | `docs/12-factories.md` |
| `bank` | `docs/11-samples.md` |
| `binary`, `binaryN` | `docs/12-factories.md` |
| `bpf`, `bpq` | `docs/07-effects-reference.md` |
| `cat`, `seq`, `slowcat`, `fastcat` | `docs/12-factories.md` |
| `choose`, `wchoose`, `chooseCycles`, `randcat` | `docs/15-random-and-probability.md` |
| `chop`, `slice`, `splice`, `striate` | `docs/11-samples.md` |
| `chord`, `voicing`, `rootNotes` | `docs/13-tonal.md` |
| `chunk`, `chunkBack`, `fastChunk` | `docs/09-conditional-modifiers.md` |
| `coarse`, `crush`, `distort` | `docs/07-effects-reference.md` |
| `compressor`, `postgain` | `docs/07-effects-reference.md` |
| `degrade`, `degradeBy`, `undegrade*` | `docs/15-random-and-probability.md` |
| `delay`, `delaytime`, `delayfeedback` | `docs/07-effects-reference.md` |
| `duckorbit`, `duckattack`, `duckdepth` | `docs/07-effects-reference.md` |
| `every` | `docs/09-conditional-modifiers.md` |
| `firstOf`, `lastOf` | `docs/09-conditional-modifiers.md` |
| `fm`, `fmh`, `partials`, `vib` | `docs/08-synths.md` |
| `gain`, `velocity` | `docs/07-effects-reference.md` |
| `hpf`, `hpq` | `docs/07-effects-reference.md` |
| `hush` | `docs/09-conditional-modifiers.md` |
| `inhabit` / `pickSqueeze` | `docs/09-conditional-modifiers.md` |
| `irand`, `rand`, `perlin`, `brand`, `brandBy` | `docs/10-signals.md` |
| `jux`, `juxBy` | `docs/07-effects-reference.md` |
| `loopAt`, `loop`, `loopBegin`, `loopEnd` | `docs/11-samples.md` |
| `lpf`, `lpq`, `lpenv`, `lpa`, `lpd`, `lps`, `lpr` | `docs/07-effects-reference.md` |
| `mask`, `struct`, `invert` | `docs/09-conditional-modifiers.md` |
| `midi`, `midichan`, `midiport`, `midimaps`, `defaultmidimap` | `docs/14-midi-io.md` |
| `midikeys`, `midin` | `docs/14-midi-io.md` |
| `n`, `note` | `docs/02-first-notes.md` |
| `often`, `rarely`, `almostAlways`, `almostNever`, `always`, `never` | `docs/15-random-and-probability.md` |
| `orbit` | `docs/07-effects-reference.md` |
| `pan` | `docs/07-effects-reference.md` |
| `pattack`, `pdecay`, `prelease`, `penv`, `pcurve`, `panchor` | `docs/07-effects-reference.md` |
| `phaser`, `phaserdepth`, `phasercenter`, `phasersweep` | `docs/07-effects-reference.md` |
| `pick`, `pickmod`, `pickF`, `pickRestart`, `pickReset` | `docs/09-conditional-modifiers.md` |
| `polymeter`, `polymeterSteps`, `pm` | `docs/12-factories.md` |
| `progNum`, `midibend`, `miditouch`, `sysex` | `docs/14-midi-io.md` |
| `register` | `docs/17-code-and-workflow.md` |
| `reset`, `restart` | `docs/09-conditional-modifiers.md` |
| `rev` | `docs/04-pattern-effects.md` |
| `room`, `roomsize`, `roomfade`, `roomlp`, `roomdim`, `iresponse` | `docs/07-effects-reference.md` |
| `run`, `silence` | `docs/12-factories.md` |
| `samples` (loader), `soundAlias` | `docs/11-samples.md` |
| `scale`, `transpose`, `scaleTranspose` | `docs/13-tonal.md` |
| `setcpm` | `docs/01-getting-started.md` |
| `sine`, `cosine`, `tri`, `saw`, `square` (signals) | `docs/10-signals.md` |
| `sometimes`, `sometimesBy`, `someCycles`, `someCyclesBy` | `docs/15-random-and-probability.md` |
| `sound`, `s` | `docs/01-getting-started.md` |
| `speed` | `docs/11-samples.md` |
| `squeeze` | `docs/09-conditional-modifiers.md` |
| `stack`, `polyrhythm`, `pr` | `docs/12-factories.md` |
| `stepcat`, `timeCat` | `docs/12-factories.md` |
| `vowel` | `docs/07-effects-reference.md` |
| `when` | `docs/09-conditional-modifiers.md` |
| `xfade` | `docs/07-effects-reference.md` |

---

## Workshop docs (intro material — skim, not depth)

The `01-05` docs are the official Strudel workshop, useful for grounding but mostly superseded by the references above:

- `docs/01-getting-started.md` — `sound`, `s`, `setcpm`, basic mini-notation
- `docs/02-first-notes.md` — `note`, `n`, scale degrees, GM/soundfont names
- `docs/03-first-effects.md` — gentle entry to `.lpf` / `.gain` / `.room` etc.
- `docs/04-pattern-effects.md` — `.rev`, `.jux`, `.ply`, `.off`, `.add`
- `docs/05-workshop-recap.md` — short summary
