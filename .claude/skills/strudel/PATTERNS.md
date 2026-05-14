# Compositional idioms

Genre starters, drum-machine semantics, mood-to-mode mapping, and re-usable moves. Consult this when composing.

---

## Drum-machine shorthand

Strudel's default sample banks use these abbreviations. Treat them as **roles**, not specific sounds:

| Abbr | Role | Notes |
|---|---|---|
| `bd` | Kick / bass drum | Downbeat anchor |
| `sd` | Snare | Backbeat in 2/4 (rock/funk), 3 (hip-hop half-time) |
| `cp` | Clap | Often used instead of (or layered with) snare in house/techno |
| `rim` | Rimshot | Drier, sparser substitute for snare; great for syncopation |
| `hh` | Closed hi-hat | Time-keeper; common at *8 or *16 |
| `oh` | Open hi-hat | Accent on the off (after the beat) |
| `cr` | Crash | Transitions, downbeats of phrases |
| `rd` | Ride | Sustained timekeeper, alternative to hh |
| `ht` / `mt` / `lt` | High / mid / low tom | Fills, breakdowns |
| `sh` | Shaker | Texture layer at *16 or fast hat replacement |
| `cb` | Cowbell | Latin, accent |
| `tb` | Tambourine | Soft texture |
| `perc`, `misc`, `fx` | Catch-alls | Risers, hits, surprises |

Drum banks worth knowing: `RolandTR808` (warm, sub-heavy), `RolandTR909` (punchy, dance), `RolandTR707` (drier, electro), `LinnDrum` (80s), `AkaiLinn` (boom-bap).

---

## Tempo cheat sheet

`setcpm(BPM/4)` for 4/4 music (Strudel's "cycle" = one bar). Quick reference:

| Genre | BPM | `setcpm()` |
|---|---|---|
| Ambient / drone | 50–80 | 12.5–20 |
| Hip-hop boom-bap | 85–95 | 21.25–23.75 |
| Trip-hop | 90–105 | 22.5–26.25 |
| House | 118–128 | 29.5–32 |
| Techno | 125–135 | 31.25–33.75 |
| Trance / hard dance | 138–150 | 34.5–37.5 |
| Drum & bass | 170–180 | 42.5–45 |
| Footwork / juke | 150–160 | 37.5–40 |

---

## Genre starter patches

### Techno (four-on-the-floor)

```js
setcpm(130/4)
stack(
  s("bd*4").bank("RolandTR909"),
  s("- cp - cp").bank("RolandTR909"),
  s("hh*16").bank("RolandTR909").gain(.5).pan(sine.slow(8)),
  n("<0 0 7 5>").scale("A1:minor").s("sawtooth")
    .lpf(sine.slow(8).range(300, 2000)).lpq(8)
    .room(.2)
)
```

### House

```js
setcpm(124/4)
stack(
  s("bd*4").bank("RolandTR909"),
  s("~ cp ~ cp").bank("RolandTR909"),
  s("[~ oh]*4").bank("RolandTR909").gain(.6),
  s("hh*8").gain(".4 .5 .4 .5"),
  n("<0 2 4 5>(3,8)").scale("F:dorian").s("piano").room(.3)
)
```

### Drum & bass

```js
setcpm(174/4)
stack(
  s("bd ~ ~ bd ~ ~ bd ~").bank("RolandTR909"),
  s("~ ~ sd ~ ~ ~ sd ~").bank("RolandTR909"),
  s("hh*16").gain(rand.range(.3, .7)),
  note("a1 ~ ~ a1 ~ <c2 g1> ~ ~").s("sawtooth")
    .lpf(400).lpenv(4).decay(.2)
)
```

### Ambient / drone

```js
setcpm(60/4)
stack(
  note("<c2 ab1 f1 g1>").s("sawtooth")
    .attack(2).release(4).gain(.4)
    .lpf(sine.slow(16).range(200, 1200))
    .room(.9).delay(.5),
  n("<0 2 4 6 4 2>").scale("C2:minor").s("triangle")
    .degrade().attack(.5).release(2)
    .pan(sine.slow(7)).room(.8)
)
```

### Hip-hop boom-bap

```js
setcpm(90/4)
stack(
  s("bd ~ ~ bd ~ ~ bd ~").bank("AkaiLinn"),
  s("~ ~ sd ~ ~ ~ sd ~").bank("AkaiLinn"),
  s("hh*8").gain(".6 .4").pan(.4),
  note("<c2 c2 eb2 g1>").s("gm_acoustic_bass").decay(.4)
)
```

### Polyrhythm experiment

```js
setcpm(28)
stack(
  polymeter(
    s("bd cp bd"),         // 3 steps
    s("hh hh hh hh"),      // 4 steps
    s("- - rim - -")       // 5 steps
  ).bank("RolandTR808"),
  n("0 3 5 7").scale("D:minor").s("sawtooth").lpf(800)
)
```

### Chord progression with arpeggiation

```js
setcpm(28)
n("0 [2 4] 4 [7 5]")
  .scale("<C:minor F:minor G:phrygian Bb:major>/4")
  .s("piano")
  .room(.4).delay(.3)
  .sometimes(jux(rev))
```

---

## Mood → mode mapping

| Feeling | Scale / mode | Why |
|---|---|---|
| Bright, heroic | `:major` | Default happy |
| Sad, introspective | `:minor` | Default melancholy |
| Mysterious, dark | `:phrygian` | Flat 2nd gives that "Egyptian/Spanish" tension |
| Tense, unresolved | `:locrian` | Diminished 5th — rarely tonic |
| Jazzy, sophisticated | `:dorian` | Minor with raised 6th |
| Groovy, bluesy | `:mixolydian` | Major with flat 7th — funk staple |
| Folky, pastoral | `:major pentatonic` | No half-steps, no clashes |
| Eerie | `:whole tone` | No leading tone — floats |
| Exotic / cinematic | `:phrygian dominant` | Major 3rd + flat 2nd — flamenco/klezmer |

---

## Common moves (apply liberally)

| Goal | Technique |
|---|---|
| Stop pattern from feeling static | `.sometimes(jux(rev))`, `.sometimesBy(.3, fast(2))`, `<a b c d>` rotation |
| Add air / breathing room | `.degradeBy(0.15)`, swap a `bd` for `~` once per phrase |
| Stereo motion | `.pan(sine.slow(8))`, `.jux(rev)`, `.jux(x => x.fast(2))` |
| Build energy | `.lpf(sine.slow(16).range(200, 4000))` — slow filter sweep |
| Glue layers | Same `.room(.3)` / `.delay(.25)` on multiple stack layers |
| Sub-bass weight | `.s("sine").lpf(120)` under the main bass |
| Sidechain feel without ducking | Punch the kick `.gain(1.1)`; pull others to `.gain(.7)` |
| Call-and-response | `<patternA patternB>` at the cycle level |
| Tension before drop | `.fast("<1 1 1 2>")` for 4-bar speed-up |
| Sparkle / hats variation | `.gain(rand.range(.3, .7))` on hi-hats |

---

## Composing for hardware (MIDI out)

If user asks for a pattern to drive external gear (synth, drum machine, modular), end the chain with `.midi('Port Name')` instead of relying on the in-browser synth. Use `.midichan(N)` to target a channel. Keep velocities reasonable: `.velocity(.4 .9 .4 .9)` for natural dynamics rather than constant max.

```js
note("c2 eb2 g2 bb2").midi('IAC Driver').midichan(1).velocity(".5 .7 .5 .9")
```

See `docs/14-midi-io.md` for the full I/O surface (pitch bend, CC, sysex, MQTT).
