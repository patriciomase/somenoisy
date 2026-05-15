# 18 — Production techniques (why default Strudel sounds cheap)

Research notes after hitting the "this sounds demo-y" wall. Conclusions drawn from reading the Strudel team's own curated example patches in `~/Desktop/Projects/strudel/website/src/repl/tunes.mjs` (878 lines — gold mine, especially `caverave`, `meltingsubmarine`, `belldub`, `bassFuge`, `blippyRhodes`, all by Felix Roos who maintains Strudel).

---

## The honest diagnosis

**The default drum banks (`RolandTR909` / `RolandTR808`) and bare synth waveforms (`sawtooth`, `sine`, `square`) are learning tools, not production tools.** Felix Roos's own showcase patches almost universally:

1. **Load real samples** from external collections via `samples(...)`
2. **Use sampled instruments** (Rhodes, kalimba, real bass, bells) — not just synth oscillators
3. **Define reusable voice functions** with proper ADSR, saturation, filter envelopes
4. **Use chord voicings** (`chord().dict('lefthand').voicing()`) for real harmony
5. **Humanize** with random speed/pan/velocity variation
6. **Mask/breathe** patterns so they don't drone unchanged for minutes

The synthesized 909/808 + raw saws we've been using are 5% of the toolbox.

---

## Sample sources experienced users actually load

```js
// Classic Tidal samples — bd/BT0A0D0.wav, sd/rytm-01-classic.wav, hh27/000_hh27closedhh.wav, …
samples('github:tidalcycles/dirt-samples');

// Felix's curated mirror — same files, faster CDN
samples({...}, 'https://loophole-letters.vercel.app/samples/tidal/');

// Real finger bass samples — multiple articulations
samples({...}, 'github:cleary/samples-flbass/main/');

// Layered kicks for live coding (5 hand-processed kicks)
samples('github:loopfall/kicks');

// Drum patterns library
// https://github.com/Junglejon/strudel-drum-patterns

// Anything from Freesound by URL
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })

// 1000+ wavetables (for synth-side work)
samples('bubo:waveforms')

// Strudel "patterns market" — curated patches by category
// https://www.strudelmarket.com/
```

The crucial mental shift: **`s("bd")` in Felix's patches refers to a loaded sample, not a default bank hit.** Loading `dirt-samples` gives you variety like `bd/BT0AADA.wav` vs `bd/BT0A0D0.wav` — round-robin them via `.n("<0 1 2 0>")` for natural-sounding drum tracks.

---

## Techniques from `tunes.mjs`, with examples

### 1. Reusable voice helper functions

From `caverave`:

```js
const keys = x => x.s('sawtooth').cutoff(1200).gain(.5)
  .attack(0).decay(.16).sustain(.3).release(.1);

// later, applied to multiple patterns:
melody.apply(keys)
chordPattern.apply(keys)
```

**Why it matters:** DRY for sound design. Define a voice once, use it on several layers, tweak in one place. Your patches stop being plumbing repeated four times.

### 2. Proper ADSR everywhere

Not just `.attack()` and `.release()`:

```js
.attack(0.05).decay(.1).sustain(.7).release(0.5)
// or shorthand:
.adsr(".05:.1:.7:.5")
```

Decay + sustain shape the note body, not just edges. This is what separates "synth presety" from "musical."

### 3. Filter envelopes (`lpa`, `lpenv`)

```js
.cutoff(500).lpa(.1).lpenv(-2)
```

`lpa` = filter envelope attack time. `lpenv` = how many octaves the envelope sweeps (negative = swoop down, positive = swoop up). This is the classic synth "wow" — every note gets a per-note filter sweep. Way more alive than a static `.lpf(500)`.

### 4. Detuning layers (`.superimpose` / `add(.04)`)

```js
.add(note("0,.04"))               // adds a voice 0.04 semitones detuned, stacked in parallel
// or:
.superimpose(x => x.add(.04))     // same idea, function form
```

Tiny detuning = chorus thickness. Felix uses this on nearly every synth voice.

### 5. Real chord voicings

```js
chord("<Cm7 Bb7 Fm7 G7b13>").dict('lefthand').voicing()
  .anchor(melody).mode('duck')    // optional: keep voicings near a reference voice
```

`.dict('lefthand')` selects a chord-voicing dictionary; `.voicing()` realizes the chord symbols into actual notes. Pair with `.anchor()` to keep them in a consistent register. **This is how Strudel does jazz/prog harmony**, not by writing every chord note by hand.

### 6. Humanization with random signals

```js
.speed(perlin.range(.97, 1.03))      // sample-playback speed wobble
.gain(perlin.range(0.5, 0.9))        // velocity wobble
.velocity("<.8 .3 .6>*8")            // explicit accent pattern
.n(perlin.range(0,3).floor())        // round-robin sample variants (or use irand(3))
```

Repetition is brutal in electronic music. Random small variation makes every cycle slightly different — the brain reads it as "alive."

### 7. Sample manipulation for character

```js
.clip(.3)                            // play first 30% of the sample
.shape(.4)                           // soft-clip saturation
.speed(-1)                           // reverse
.begin(perlin.range(0.02, 1))        // randomize sample start point
.end(perlin.range(.5, 1))            // random end point
.chop(128).jux(rev)                  // granular re-chop with stereo reverse
```

Especially powerful on loaded one-shots. `.shape()` is gentler than `.distort()` — try it on basses for warmth.

### 8. Echo (different from delay!)

```js
.echo(4, 1/8, .5)                    // 4 echoes, 1/8 cycle apart, gain decay .5
.echoWith(4, 1/8, (x, n) => x.transpose(n*12).gain(Math.pow(.4, n)))
```

`.echo()` schedules N explicit replays. `.echoWith()` lets you transform each echo (e.g. octave up, fade out). More musical than the room/delay effects for melodic stutter/trail.

### 9. Arrangement via `.mask()`

```js
.mask("<x@7 ~>/8")          // plays for 7 cycles, rests 1 — natural breathing
.mask("<~ x>/16")           // joins after 16 cycles — build-up
```

This is how songs get structure without `arrange()`. A pad that breathes every 8 cycles, a melody that joins after 16 — the piece evolves.

### 10. Tempo

Felix uses `setcps(...)` (cycles per second, the fundamental unit) more than `setcpm()`:

```js
setcps(1)        // one cycle per second
setcps(125/60/4) // 125 BPM, 4 beats per cycle
```

`cpm` is just `cps * 60`. Use either, but be aware most published patches use `cps`.

### 11. Stable randomness

```js
useRNG('legacy')
```

The `legacy` RNG is deterministic per pattern — the random choices are the same every cycle. Without this, patches sound different every time and become hard to mix.

---

## Things still missing from our reference docs

Functions I saw in `tunes.mjs` but haven't documented in `docs/01–17`:

- `.apply(fn)` — apply a voice-defining function
- `.echo(n, time, decay)` / `.echoWith(n, time, fn)`
- `.iter(n)` — rotate through copies
- `.euclidLegato(b, s)` / `.euclidLegatoRot(b, s, rot)`
- `.layer(fn1, fn2, …)` — stack multiple transformations of the same pattern
- `.superimpose(fn)` — `pat.stack(fn(pat))` shorthand
- `.shape(amount)` — saturation
- `.scaleTranspose(steps)` — diatonic transpose
- `chord(...).anchor(otherPat).mode('above'|'below'|'duck')`
- `.early(amount)` / `.late(amount)` — time-shift in fractions of a cycle
- `useRNG('legacy')`
- `setcps(x)`
- `.fanchor(x)` — filter envelope anchor

Worth a follow-up doc-mining pass through Strudel's JSDoc / `doc.json`.

---

## Honest limits

Even with all of the above, Strudel patches will not sound like a polished DAW-mixed track. Real production also requires:

- Mixing (per-track EQ, compression, sidechain)
- Mastering (limiter, glue, stereo widening)
- Often, render to WAV and finish in Ableton/Bitwig/Reaper

Strudel's strength is **live-coded musical ideas with character**. For "finished" tracks, the typical workflow is: live-perform → record audio (Audacity capture or Strudel's own export) → post-process in a DAW.
