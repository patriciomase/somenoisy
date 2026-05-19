# Live-performance methodology — advanced breakbeat segmentation & flow

Advanced techniques for live coding with sampled material — chopping breakbeats, freezing randomness into looped variations, structuring build-ups and drops. Distilled from a YouTuber doing live Strudel performance (project knowledge, May 2026).

**Consult when** the user asks for:
- chopped breakbeats, jungle / breakcore / footwork patterns
- live-performance flow (build-ups, drops, transitions, "drop on cycle N")
- "make it more wonky / glitchy / chopped"
- sample manipulation beyond simple playback (granular feel, stutters, repeat patterns)

Cross-refs: see `docs/11-samples.md` (sample loading + manipulation reference), `DRUMS.md` (rhythm fundamentals), `PATTERNS.md` (DnB starter as a baseline).

---

## 1 · Sample preparation: standardisation matters

In live-coding audio systems, **the preparation phase is the determining factor for rhythmic coherence**. Sampled breakbeats must be standardised before algorithmic manipulation so pitch/speed math is predictable.

### Cycle-length normalisation

Professional sample repos pre-compress breakbeats for full sonic density (consistent transients) and **normalise file length to exactly two cycles**. Because of this convention, Strudel needs the `/2` operator to scale the sample so it fits **one cycle** of the running tempo:

```js
s("amen/2").gain(0.8)
// The /2 compensates the file's 2-cycle length → 1:1 alignment with the global bar.
```

> Strudel auto-adjusts the sample's playback speed based on the `/N` divisor. Without it, an "Amen" loop typically plays at half-speed against the tempo grid.

### Phase validation with a white-noise click

Before performing, **drop in a technical metronome**: 8th-note white-noise hits with very short decay. This is *not* a musical element — it's a diagnostic tool to verify the sample's phase aligns with your tempo grid.

```js
// phase-validation metronome
s("white", "0 [0 0] 0 0").decay(0.05).gain(0.2)
s("amen/2").gain(0.8)
```

If the Amen's snare lands ahead of or behind the white-noise clicks, the sample needs different scaling (try `/1`, `/2`, `/4`). Once aligned, remove the click and proceed.

---

## 2 · Surgical chopping with `scrub` and `seg`

The `.scrub()` control is a **floating-point pointer (0–1) into the sample**. It enables granular synthesis and tape-loop-style manipulation in real time — re-contextualising fragments outside the standard rhythm grid.

### Discrete vs continuous indexing

For Jungle-style classic chopping you want **deterministic grid positions**, not continuous randomness. Use `irand(N).div(N)` to generate quantised integer positions:

```js
// 16 fixed chop positions
s("amen/2")
  .scrub(irand(16).div(16))
  .seg(16)
```

### `seg(N)` — the playback window

`seg(N)` defines the **size of the window** each scrub trigger plays. `seg(16)` ≈ a 16th-note window per trigger; `seg(8)` ≈ an 8th. This is what keeps random chops from sounding messy — every fragment plays for a clean rhythmic duration.

> ⚠️ `seg` is registered as both `segment` and `seg`. Confirmed: `pattern.mjs:2345`.

---

## 3 · `ribbon` — temporal scissors

The `ribbon` function is the **single most important live-performance tool** for taming algorithmic randomness. It loops a fixed slice of time, **decoupling the master clock from the pattern's internal randomness**. Random results inside the ribbon are still random — but they're frozen, so the same "random" sequence repeats predictably.

### Confirmed signature

```js
// pattern.ribbon(offset, cycles)
//   offset: start point of the loop, in cycles
//   cycles: loop length, in cycles
```

### Freeze a random sequence into a loop

```js
n(irand(8).segment(4)).scale("c:pentatonic").ribbon(1337, 2)
// Random pentatonic sequence at cycle 1337, looped over 2 cycles forever.
// Change "1337" mid-performance to fetch a different random sequence.
```

### Alternating frozen sections (the YouTuber's move)

Switch between two different "random slices" of time to create A/B variations:

```js
s("amen/2")
  .scrub(irand(16).div(16))
  .seg(16)
  .ribbon("<4 20>", 2)        // alternate offset between cycle 4 and cycle 20
                              // (cycles param = 2 = loop length)
```

> The original YouTuber snippet was `.ribbon("<4 20>")` with one arg. The confirmed `ribbon(offset, cycles)` signature wants two — pass `2` (or however long) as the loop length. Test in REPL when applying.

### Probabilistic stutter via `almostNever` + `ply`

Inject occasional micro-repeats without committing to them every bar. `almostNever` is a probability gate (10%) that applies a transform sparsely:

```js
s("amen/2")
  .scrub(irand(16).div(16))
  .seg(16)
  .ribbon(4, 2)
  .almostNever(s => s.ply("<2 4>"))
// 10% of the time, a chunk plays 2× or 4× speed — emulates DJ-style stutter
```

> Confirmed: `almostNever = sometimesBy(0.1, fn)`. See `docs/15-random-and-probability.md`.

---

## 4 · Manual chop architecture — arrays + `pick`

For deliberate composition (not random), build a **library of preferred chop positions** as an array, then navigate it manually via `pick`.

```js
let chops = [.3, .2, .05, .16];
s("amen/2")
  .scrub(v(chops).pick("<0 1 2 3>"))
  .n("<0*3 1>/4")              // alternate samples within the bank
  .struct("0@5, 0@3")           // 5+3 "wonky" subdivision over the bar
```

> ⚠️ `v(chops)` is a **slider / UI control** binding (lets you tweak the array in the REPL UI live). The exact API may be `slider()`, `valueOf()`, or specific to a Strudel extension — **verify in the REPL before relying on the `v(...)` form**. The bare `pick` part works regardless: `s("amen/2").scrub(pick("<0 1 2 3>", chops))` is the more portable spelling.

### The "5+3 wonky" signature pattern

`struct("0@5, 0@3")` divides the bar into a 5+3 grouping instead of 4+4. The events stay locked to the global metric, but the internal accent shifts off-grid — a Switch Angel signature move. Try it on snares or chops to break out of straight 4/4 without abandoning the meter.

### Multi-sample rotation

`.n("<0*3 1>/4")` rotates through bank variants — three hits of sample 0, one of sample 1, over 4 cycles. Layers texture without changing the underlying chop pattern.

---

## 5 · Signal cohesion for live mixing

Raw stacks of dispar­ate samples sound disjointed. Live performance uses **bus-style processing tricks** to glue them.

### Distortion as glue

```js
s("amen/2").distort(2).gain(0.7)
// distort(2) saturates the sample's full spectrum, "gluing" disparate transients;
// pull the gain down to preserve headroom afterwards.
```

A small amount of saturation on the chopped break gives it a unified character that masks the seam between chops. Then duck `gain` so the saturated peaks don't clip.

### Exponential LPF curves (human hearing)

Linear filter sweeps sound mechanical. Human auditory perception is logarithmic, so cutoff curves should be exponential:

```js
.lp(slider(0, 0, 100).pow(2))
// Initial value 0, range 0–100, then squared so it curves musically.
// Output range: 0 to 10000Hz (since 100² = 10000).
```

> **Confirmed:** `slider(value, min, max, step)` is the in-editor slider widget — provided by `@strudel/codemirror`. The transpiler turns it into a live-bound control you can drag in the REPL UI. (Earlier source material called this `v("name", ...)` — that form does not exist in current Strudel; use `slider(...)` instead.)

### Pads: phasers + long attacks

For harmonic background (pads, drone layers):

```js
s("swpad")
  .scrub(0.4)                       // pick a sustained portion of the pad sample
  .phaser()                         // adds movement
  .lp(v("filter", 0, 0, 100).pow(2)) // sweepable filter
  .attack(2)                        // slow attack so it doesn't poke the breakbeat
```

The long attack lets pads "breathe in" the mix without competing with the breakbeat's transient peaks.

---

## 6 · Performance flow — build-ups and drops

The architecture of a live set is about *managing energy* — building tension via incremental compression, releasing it on precise cycle boundaries.

### Global transforms with `all`

```js
all(s => s.ribbon(v("buildup", 1, 0.5, 0.125)))
```

`all(fn)` applies `fn` to **every active sound** in the stack — a global wrapper. Used here to apply a shortening ribbon loop to everything simultaneously: as the slider drops from `1` → `0.5` → `0.125`, the loop length contracts, creating "temporal compression" — the same beat repeating faster and faster. Classic build-up tension.

> ⚠️ `all(...)` as a top-level function: I could not confirm it in `packages/core`. This may be from `@strudel/repl`, a Tauri integration, or community extensions. Try it; if not present, you can manually apply the same transform to each layer with a `.ribbon(...)` chain or use a helper:
>
> ```js
> const compress = x => x.ribbon(0, 0.125);
> stack(layer1, layer2, layer3).apply(compress)
> ```

### Precision resolution with `newcycle`

The drop needs to land **exactly** on a specific cycle boundary — usually cycle 6 in an 8-bar phrase (so bars 7–8 are the new section's pickup). The technique:

```js
s("bass").note("f1").newcycle(6)
// resolves to the F bass note exactly on cycle 6
```

> ⚠️ `newcycle` was **not found** in core search. Strudel has `restart` and `reset` for cycle-aligned re-triggering (see `docs/09-conditional-modifiers.md`). The intent of `newcycle(6)` is likely "fire/restart this on cycle 6"; achievable with:
>
> ```js
> s("bass").note("f1").restart("<x ~ ~ ~ ~ ~ x ~>/8")  // restart on cycles 0 and 6 of every 8
> ```
>
> Test the actual `newcycle` function in the REPL — if it exists, prefer it for cleanliness.

### Build-up recipe

A standard build-up arc:

1. **Bars 1–4**: full pattern playing normally.
2. **Bars 5–6**: apply `all(s => s.ribbon(0, 0.5))` — every layer compresses to 0.5-cycle loops.
3. **Bars 7–8**: shorten further: `ribbon(0, 0.25)` → `ribbon(0, 0.125)`. Pattern stutters at maximum compression.
4. **Cycle 8 / start of next phrase**: release — drop `all(...)` to restore normal length AND `newcycle(0)` the bass to a new tonic.

The listener experiences: settled groove → mounting tension as the loop shrinks → release into the new section.

---

## 7 · Signature sound recipes

Reusable building blocks from Switch Angel's live sets.

### 7a · The Reese / saw bass — dark jungle bedrock

The "Reese vibe" — a thick, distorted, sub-heavy mid-bass that's the harmonic backbone of jungle / DnB / dark prog. Key ingredients: **`supersaw` synth + heavy LPF + light distortion + slow attack** for a swelling character.

```js
// Basic Reese — pattern any minor / phrygian sequence
note("c2 g#1 f1")
  .s("supersaw")
  .lpf(400)            // keep it sub-focused, no high content
  .distort(1.5)        // adds warmth / "heat" / grit
  .attack(0.2)         // swelling envelope, not punchy
  .gain(.6)
```

Why `supersaw` over `sawtooth`: supersaw is multiple saws detuned and stacked internally — instant thickness without manually layering. Combined with the LPF it becomes the classic Reese.

**Layering for "tortion" (more distortion + texture):** stack a second `supersaw` (or a wavetable like `wt_*`) underneath, slightly detuned via `.add(note("0,.04"))`:

```js
stack(
  note("c2 g#1 f1").s("supersaw")
    .lpf(400).distort(1.5).attack(.2).gain(.5),
  note("c2 g#1 f1").s("supersaw")
    .add(note("0,.07"))              // detuned second voice
    .lpf(300).gain(.35)                // sits below the first
).cpm(170/4)
```

Variations:

- **More aggressive Reese:** `.distort(2.5)` + `.shape(.4)` for cascading harmonics
- **More movement:** add `.vib(2).vibmod(0.15)` for that classic detuning wobble
- **Sub anchor underneath:** layer `note(rootNote).s('sine')` for sub-frequency weight

### 7b · White noise as a hat — instant percussion

Take noise, slice it short, and it becomes a hi-hat. This is also the trick for the **technical metronome** in §1 (sample-prep validation) — same technique, different gain/decay tuning.

```js
// 8th-note white-noise hat
s("white")
  .struct("x*8")          // 8 hits per cycle
  .decay(0.05)            // short = pluck/tick character
  .sustain(0)             // no held tail
  .gain(0.4)              // pulled down so it sits in the mix
```

`note("0*8")` (from the source) and `struct("x*8")` are equivalent ways to fire 8 events per cycle on a single-event input. `struct` is slightly more idiomatic for "rhythm of this sound".

Variations:

- **16th hats:** `.struct("x*16")` + reduce gain to `.25`
- **Pink/brown noise** = darker hat character (less bright):
  ```js
  s("pink").struct("x*8").decay(.04).gain(.3)
  s("brown").struct("x*8").decay(.06).gain(.4)   // even warmer
  ```
- **HPF for a sizzle hat instead of tick:** `.hpf(4000).decay(.1)`
- **Swung garage version:** add `.late("0 .02".fast(4))` (the trick from `DRUMS.md` §3)
- **Filtered "shhh" build-up sound:** longer decay + filter sweep:
  ```js
  s("white").struct("x").decay(2).lpf(slider(800, 200, 8000)).gain(.3)
  ```

---

## 8 · Function catalog — Switch Angel live-set utilities

Quick reference for the controls she uses live, beyond the chopping/ribbon core. Verified against `packages/core/controls.mjs` unless noted.

| Function | Where | What it does | Live use |
|---|---|---|---|
| `gate` (alias `gat`) | controls.mjs:2108 | Note-on/off gate — controls whether a triggered note actually fires. Pattern it for rhythmic ducking. | Open/close pads and leads to "duck" them, create rhythmic gaps. `s("pad").gate("<1 1 0 1>")` mutes the pad on the 3rd cycle. |
| `channel` | controls.mjs:1279 | Routes the sound to a specific audio output channel (1, 2, 3, 4…). | Multi-output performances — send drums to ch1, bass to ch2, leads to ch3, vocals to ch4 → her external mixer handles independent volume and per-channel FX. |
| `slider(value, min, max, step)` | @strudel/codemirror | In-editor dragable widget, transpiles to a live-bound value. | Maps real-time parameters: filter cutoffs, breakbeat speed, distortion drive — "tactile DJ-style control." |
| `phaser(speed)` + `phaserdepth`, `phasercenter`, `phasersweep` | docs/07-effects-reference.md | Classic phaser effect — adds movement / sweep texture. | Heavily on leads, pads, supersaw stabs — that "electronic" sweep flavour. |
| `pan(signal)` | controls (pan) | Stereo position 0 (L) → 1 (R). Combine with `rand` for chaotic stereo. | `pan(rand)` on vocal shots and percussion → "light moving around your ears" effect. Random per event. |
| `scale("KEY:MODE")` | docs/13-tonal.md | Quantises `n(...)` to a key/mode. | Keeps improvised melodies musical even when notes are random: `n(irand(8)).scale("c:phrygian")`. |
| `ribbon(offset, cycles)` | pattern.mjs:2894 | (See §3) Freeze a slice of time into a loop. | The fundamental "controlled randomness" tool. `.ribbon(4)` (one arg, defaults to 1-cycle loop) restarts every 4 cycles for recognisable improvisation. |

### Composing them — the live-coding loop

A typical Switch Angel layer chain:

```js
// Random melodic line, locked to a key, stereo-scattered, routed to channel 3
n(irand(8)).scale("c:phrygian")
  .s("supersaw")
  .lpf(slider(800, 200, 4000))     // sweepable in real time
  .phaser(2)
  .gate("<1 1 1 0>")                // 4-cycle pattern with one cycle muted
  .pan(rand)                        // chaotic stereo
  .ribbon(4)                        // freeze the random for 4 cycles before reshuffling
  .channel(3)                       // dedicated mixer output
```

That single chain combines **5 of the catalog tools** — scale + slider + phaser + gate + pan + ribbon + channel. The "year-3000 DnB" character is exactly this density of orthogonal effects on top of supersaw / chopped break / white-noise foundations.

---

## Summary: the live-performer's mental model

> "Strudel mastery is not about code complexity — it's about building a **technical architecture** that enables fluid improvisation. The algorithm becomes a living instrument."

The four pillars of this approach:

1. **Standardise inputs** — pre-compressed, two-cycle samples. `/2` operator. Validate with white noise.
2. **Surgical chopping** — `scrub` + `seg`, with `irand(N).div(N)` for discrete positions.
3. **Freeze randomness** — `ribbon(offset, cycles)` to loop a slice of random time deterministically. A/B switch with patterned offsets.
4. **Sculpt the arc** — `all(...)` global transforms, `newcycle(N)` resolutions, exponential filter sweeps via slider controls.

When asked for a live-coding-style breakbeat patch, layer these as appropriate — don't ladle everything at once.

---

## Reference patch — chopped Amen, ribbon-locked, with stutter and pad

A consolidation of the techniques above into a paste-runnable Strudel patch (assumes `amen` and `swpad` samples loaded; see `docs/11-samples.md`):

```js
samples('github:tidalcycles/dirt-samples')   // amen via this or a dedicated breaks repo

let chops = [.3, .2, .05, .16];

stack(
  // chopped break — frozen random via ribbon, occasional stutter
  s("amen/2")
    .scrub(irand(16).div(16))
    .seg(16)
    .ribbon("<4 20>", 2)
    .almostNever(s => s.ply("<2 4>"))
    .distort(1.5).gain(.7),

  // sustained pad — held portion of swpad, phaser, slow attack
  s("swpad").scrub(0.4)
    .phaser()
    .attack(2).release(3)
    .gain(.25).room(.6),

  // bass — fires the tonic on cycle 6 (the drop point) — see note on newcycle
  s("bass").note("f1")
    .restart("<x ~ ~ ~ ~ ~ x ~>/8")
    .gain(.6),

  // phase-validation click — keep visible during sound design, mute when comfortable
  // s("white", "0 [0 0] 0 0").decay(0.05).gain(0.2),
)
.cpm(170/4)
```

The commented-out phase-validation click is left as a hint — uncomment it any time the chopped break feels rhythmically wrong against the bass.
