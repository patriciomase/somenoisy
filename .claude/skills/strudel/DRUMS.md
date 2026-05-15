# Rhythm fundamentals + Strudel drum authoring

The deep reference for drums. Consult this when:

- Composing any patch with drums (always — `PATTERNS.md` has the broad-strokes genre starters, this has the *why*).
- The user asks for a specific groove ("swing", "syncopated", "polyrhythmic", "with a fill") and you need the precise Strudel construction.
- A drum pattern feels wrong and you can't tell why — usually it's a frequency-coherence or beat-anatomy issue from this doc.

---

## 1. What rhythm *is*

Rhythm is the precise placement of sonic events in time. It is the most fundamental aspect of music — the spine that all other elements wrap around. Genres like drone, noise, and ambient can deliberately abandon rhythmic structure to explore texture, but in dance-oriented electronic music, **rhythm is the axis that guarantees coherence and recall**.

When authoring, always frame: *where does the listener's body land?* That's the downbeat. Everything else negotiates with it.

---

## 2. The rhythmic container — time signatures and tempo

A time signature reads like a fraction:

- **Top number** — pulses per bar
- **Bottom number** — note value of each pulse (4 = quarter note)

| Signature | Feel | Strudel |
|---|---|---|
| **4/4** | universal dance standard | default — 4 cells per cycle is one beat each |
| **3/4** | waltz feel | `note("[a b c]")` per cycle, or `.slow(3)` with 3-element patterns |
| **6/8** | triplet swing — *Latch* (Disclosure), *Tainted Love* (Soft Cell) | `note("[a b c d e f]")` per cycle, accents on 1 and 4 |

**Tempo** is the speed of the underlying pulse, measured in **BPM** (beats per minute).

```js
// 125 BPM in 4/4: 125 beats/minute ÷ 4 beats/cycle = 31.25 cycles/minute
setcpm(125/4)
// or as a method:
pattern.cpm(125/4)
```

> Strudel uses **cycles per minute (cpm)** or **cycles per second (cps)** as its primitive. One cycle = one bar in 4/4. Convert BPM with `cpm = BPM / beats-per-cycle`.

---

## 3. Grid subdivisions and swing

Inside a 4/4 bar, the quarter note divides hierarchically: eighths (8 per bar), sixteenths (16), thirty-seconds (32). Triplet variants divide groups into threes.

```js
// 4 quarters
s("bd bd bd bd")
// 8 eighths
s("hh*8")
// 16 sixteenths
s("hh*16")
// triplet eighths
s("[a b c]*4")   // 12 events per bar — 3-against-4 with the quarter pulse
```

### Swing / shuffle

The push-pull effect that turns a robotic beat into a *groove*. In house/UK garage, **16th-note swing** is essential:

- The **1st** and **3rd** sixteenth in each group of 4 gets *longer*.
- The **2nd** and **4th** gets *shorter*.

**Strudel doesn't have a built-in `.swing()` function.** Hand-roll it with `.late()` or `.nudge()` patterned alternately:

```js
// 16th hats with subtle swing — every other 16th nudged late
s("hh*16").late("0 .015 0 .015".fast(4)).gain(.5)
//          .015 cycle ≈ ~29ms at 125 BPM — classic UK garage micro-shuffle
```

Increase `.015` toward `.03` for heavier swing (deep house, hip-hop). `0` means no swing (techno).

---

## 4. Anatomy of a bar — beat hierarchy

Not all pulses carry equal perceptual weight.

| Pulse | Definition | Typical role |
|---|---|---|
| **Downbeat** | The "1" — first beat of the bar | The strongest anchor. Usually the kick. |
| **Backbeat** | Beats **2 and 4** (the even pulses) | Snare / clap home. |
| **Upbeat** | The last beat — the "4" | Generates lift toward the next downbeat. |
| **Offbeat** | The "and" between main pulses (the *8ths*) | Energy bridge — open hats, percussion. |

In a 16-step mini-notation pattern, slots map as:

```
slot:    1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
beat:    1   e   &   a   2   e   &   a   3   e   &   a   4   e   &   a
role:    DN              BB              UP              BB
```

`DN` = downbeat anchor (kick) · `BB` = backbeat (snare) · `UP` = upbeat (lift)

```js
// canonical 4/4 anatomy
stack(
  s("bd*4"),                                      // downbeats (all 4 main pulses)
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~"),         // backbeat (slots 5 & 13)
  s("~ oh ~ oh ~ oh ~ oh")                         // offbeats (the "and"s — 8th-note ohs)
)
```

---

## 5. Syncopation, ghost notes, frequency coherence

**Syncopation** uses *weak* subdivisions ("ands", "e"s, "a"s) to create tension that resolves on the next strong beat.

```js
// snare hits on weak positions — syncopated, pulls toward beat 1
s("~ ~ ~ ~ sd ~ ~ sd ~ ~ ~ ~ sd ~ ~ ~")
//          beat2        a-of-2    beat4
```

### ⚠️ Frequency coherence

A core production rule: **don't put heavy low-frequency content on weak beats.** A kick or low tom on the "a of 2" makes the groove feel erratic — the brain expects bass weight on the strong pulses.

**Fix:** populate weak/syncopated positions with **mid/high-frequency** content — percussion, hi-hats, claps, rim shots. Reserve `bd`, `lt`, sub-bass for the downbeat lattice.

### Ghost notes

Softer hits — usually on the snare in acoustic drumming. In electronic music, **substitute with a different instrument entirely** to enrich the spectrum:

```js
// "snare with ghost" — main snare on 2/4, ghosts via rim/perc on weak 16ths
stack(
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~").gain(.9),    // main backbeat
  s("rim*16").mask("0 0 1 0 0 0 0 1 0 0 1 0 0 0 1 0").gain(.3)
  //                ↑     ↑       ↑       ↑   — 4 ghost rim hits on weak positions
)
```

---

## 🛠 EXERCISE: The "Spine Beat"

Always-good starting structure to bootstrap a 4/4 patch:

```js
// the spine — kick on all 4, backbeat on 2/4, hats on offbeats
stack(
  s("bd*4"),
  s("~ cp ~ cp"),               // or sd in place of cp
  s("~ hh ~ hh ~ hh ~ hh")       // closed hats on the "ands"
).cpm(125/4)
```

Once this spine is solid, **add syncopation on the "e"s and "a"s with high-frequency sounds** (hh, rim, perc, shaker). Never on bd or lt.

---

## 6. Drum machines as instruments

The voice of electronic rhythm has been defined by specific hardware. Each has a character — knowing them is non-negotiable.

| Machine | Character | Strudel `bank()` | Best for |
|---|---|---|---|
| **Roland TR-808** | Warm, deep sub-kick, cosmic claps | `"RolandTR808"` | Hip-hop, trap, deep house, ambient |
| **Roland TR-909** | Punchy attack, snappy snares, bright hats | `"RolandTR909"` | Techno, hard house, big-room |
| **Roland TR-606** | Dry, simple, iconic minimalism | `"RolandTR606"` | EBM, industrial, lo-fi |
| **Roland TR-707/727** | Cleaner samples, Latin percussion | `"RolandTR707"` | Electro, freestyle, 80s pop |
| **Roland CR-78** | Preset-based, vintage warmth | `"RolandCR78"` | Lounge, leftfield, *Heartbeat* (Pollard) |
| **Linn LM-1** | First sampled drum machine — natural | `"LinnDrum"` | 80s pop, R&B, Prince records |
| **Oberheim DMX** | Crisp, distinctive snare | check `bank()` options | Run-DMC, early hip-hop |
| **Yamaha RX5 / Kawai R50** | Hard, processed — defined 90s industrial | community samples | Industrial, ebm |
| **Akai MPC60** | Crunchy 12-bit grit | `"AkaiLinn"` or external samples | Boom-bap hip-hop, breakbeat |
| **E-mu SP-1200** | Low sample rate, gritty kicks | external samples | Golden-age hip-hop, lo-fi |

```js
// the same pattern, three different banks — three different worlds
s("bd*4, ~ cp ~ cp, hh*8").bank("<RolandTR808 RolandTR909 LinnDrum>")
```

For more variety than the built-in banks: load `github:tidalcycles/dirt-samples` and round-robin via `.n("<0 1 2 3>")`.

### MIDI General Drum Map

When driving external gear, follow the GM drum standard (bd=36, sd=38, hh=42, oh=46, cr=49, rd=51, etc.) so a controller "plays the kit by hand" and feels human. Don't forget character instruments: **claves**, **flexitone**, **agogô**, **timbale** — they distinguish a generic groove from a memorable one.

---

## 7. Complex metric relationships

First: the **meter** is the grouping of pulses in recurring patterns — duple (2), triple (3), quadruple (4).

### Polymeter

Two or more parts share the same **subdivision** but use different **meters** — pulses align, downbeats drift.

```js
// 3/4 pattern over 4/4 kick — they share the 8th-note grid but downbeats phase
stack(
  s("bd*4"),                          // 4/4
  polymeter(
    s("rim mt rim"),                  // 3-step pattern
    s("hh hh hh hh")                  // 4-step pattern
  ).bank("RolandTR909")
)
```

### Polyrhythm

Different rhythmic **patterns** within the same meter — downbeats coincide, subdivisions don't.

```js
// 3 against 4 polyrhythm — three even hits across one bar
stack(
  s("bd*4"),
  s("[lt*3]").gain(.6)                // 3 evenly-spaced toms per bar
)
// or via Euclidean:
stack(
  s("bd*4"),
  s("lt(3,16)")                       // 3 toms distributed over 16 steps
)
```

Polyrhythm is "tuplet on top of tuplet" — the micro-subdivisions don't fit the standard grid, creating cross-rhythmic interest.

---

## 8. Phrase structure — the **ABAC / AAAD** framework

Rhythm doesn't live in one bar; it lives in **phrases** of 4, 8, or 16. A professional template:

| Bar | Label | Role |
|---|---|---|
| 1, 3, 5, 7 | **A** | The central / base groove |
| 2 | **B** | Small variation — one extra hit, one subtraction |
| 4 | **C** | Larger variation marking the midpoint of the 8-bar phrase |
| 8 | **D** | Transition — the fill or empty before the next section |

In Strudel, encode this with `.every(n, fn)` and `<>` alternations:

```js
stack(
  s("bd*4")
    .every(8, x => x.struct("x ~ x x x ~ x x"))       // bar 8 = the D fill
    .every(4, x => x.struct("x ~ x x x ~ x ~")),      // bar 4 = the C variation
  s("~ cp ~ cp")
    .every(2, x => x.add(s("~ ~ ~ rim")))             // bar 2 = the B variation
)
```

`every(N, fn)` fires `fn` on every Nth cycle — perfect for ABAC structure when cycles = bars.

---

## 9. Transitions — fills and empties

Two opposite tools to manage energy before a section change.

### Fill (relleno)

Adds rhythmic density — syncopation, tom rolls, snare flurries — to raise tension toward the next downbeat.

```js
// bar 8: a tom fill replaces the snare
s("~ cp ~ cp")
  .every(8, x => s("~ lt mt ht [mt ht]*2"))
```

### Empty (vacío) — *the kick drop*

The opposite of a fill: **remove** elements, especially the kick. Killing the bass on bar 8 destabilizes the low end and creates a void the listener urgently expects to be refilled. **This is the structural pillar of techno.**

```js
// kick plays bars 1–7, silent on bar 8
s("bd*4").mask("<x@7 ~>/8")

// or more dramatic — kick drops on bars 7 AND 8, doubling the tension
s("bd*4").mask("<x@6 ~ ~>/8")
```

For a full 32-bar drop before a section change:

```js
arrange(
  [7, s("bd*4")],          // 7 bars of kick
  [1, silence],            // 1 bar empty — the void
  [...the next section]
)
```

---

## Reference patterns — paste-ready drum bodies

### "Cold techno" — 909, 4-on-floor, off-beat open hat, sparse percussion

```js
setcpm(130/4)
stack(
  s("bd*4").bank("RolandTR909").gain(.95),
  s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~").bank("RolandTR909").gain(.7),
  s("hh*16").bank("RolandTR909").gain(perlin.range(.2, .5)),
  s("~ oh ~ oh ~ oh ~ oh").bank("RolandTR909").gain(.4).hpf(2500),
  s("rim(3,16,2)").bank("RolandTR909").gain(.4).pan(.7)
)
```

### "Boom-bap" — MPC-style, swung 16ths, half-time snare

```js
setcpm(90/4)
stack(
  s("bd ~ ~ bd ~ ~ bd ~ ~ ~ ~ ~ ~ ~ ~ ~").bank("AkaiLinn"),
  s("~ ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~").bank("AkaiLinn").gain(.9),
  s("hh*8").bank("AkaiLinn").gain(".6 .4").late("0 .03".fast(4))   // swing
)
```

### "DnB amen feel" — break-sample chopped, 170+ BPM

```js
setcpm(174/4)
samples('github:tidalcycles/dirt-samples')

stack(
  s("breaks165").slice(8, "0 1 [2 2*2] 3 [4 0] 5 6 7").gain(.9),
  s("bd ~ ~ bd ~ ~ bd ~").bank("RolandTR909").gain(.5),         // sub-kick anchor
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR909").gain(.6)            // backbeat reinforcement
)
```

### "Dark prog house with phrygian bass" (project signature)

See [PATTERNS.md → genre starters] and `patches/dark-base.js` in this project for the lived example. Key drum moves:

```js
stack(
  s("bd*4").n("<0 1 2 0 3 0 1 2>")               // sample variation per cycle
    .speed(perlin.range(.97, 1.03))               // micro-humanization
    .gain(.9),
  s("bd*4").bank("RolandTR808").lpf(100).gain(.5), // SUB-LAYER for weight
  s("~ ~ ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~ bd ~").gain(.4) // breakbeat ghost-kicks
)
```

---

## Strudel-specific gotchas for drums

- **No `.swing()` function.** Use `.late()` or `.nudge()` with alternating patterns (see §3).
- **Sample loading is lazy** — the first cycle of a fresh patch may be silent while drums download.
- **Layer kicks for weight** — single-sample kicks always sound thin. Stack 909 (attack) + 808 (sub, lowpassed to ~100Hz) + occasional break-kick variant.
- **`bd*4` plays the same sample 4 times.** Add `.n("<0 1 2 3>")` (with multi-sample banks) to round-robin and break the "drum machine" feel.
- **Don't over-quantize.** Add `.speed(perlin.range(.97, 1.03))` and/or `.gain(perlin.range(.7, 1))` to humanize. The human ear forgives a lot when there's small variation.
- **Frequency hygiene** beats clever programming. If a syncopated kick on the "a of 3" makes the groove feel wrong, it's not your fault — it's physics. See §5.
