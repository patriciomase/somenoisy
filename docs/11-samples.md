# 11 — Samples (loading and manipulation)

Source: <https://strudel.cc/learn/samples/>

How to load sounds beyond the defaults, and how to manipulate sample playback.

---

## Built-in banks

Strudel ships with **tidal-drum-machines** and **VCSL** instrument samples. Browse them in the REPL's `sounds` tab.

Standard drum shorthand:

| Name | Meaning |
|---|---|
| `bd` | Bass drum |
| `sd` | Snare |
| `rim` | Rimshot |
| `cp` | Clap |
| `hh` / `oh` | Closed / open hi-hat |
| `cr` / `rd` | Crash / ride |
| `ht` / `mt` / `lt` | High / mid / low tom |
| `sh` | Shaker |
| `cb` | Cowbell |
| `tb` | Tambourine |
| `perc`, `misc`, `fx` | Catch-alls |

```js
s("bd sd [~ bd] sd,hh*16, misc")
```

---

## Loading custom samples

### 1. Inline via `samples()` with URL map

```js
samples({
  bassdrum: 'bd/BT0AADA.wav',
  hihat: 'hh27/000_hh27closedhh.wav',
  snaredrum: ['sd/rytm-01-classic.wav', 'sd/rytm-00-hard.wav'],
}, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');

s("bassdrum snaredrum:0 bassdrum snaredrum:1, hihat*16")
```

### 2. From a `strudel.json` index file

```js
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
s("bd sd bd sd,hh*16")
```

Format:

```json
{
  "_base": "https://.../",
  "bassdrum": "bd/BT0AADA.wav",
  "hihat": "hh27/000_hh27closedhh.wav"
}
```

> Cache gotcha: browsers cache `strudel.json`. Bust with `?version=2` when updating.

### 3. GitHub shortcut

```js
samples('github:tidalcycles/dirt-samples')
samples('github:tidalcycles/dirt-samples/branch-name')   // pinned branch
```

Expects `strudel.json` at the repo root.

### 4. Local disk — browser folder import

Open the REPL's `sounds` tab → "import sounds folder". Nested folders become banks:

```
samples/
  ├─ swoop/
  │   ├─ swoopshort.wav
  │   └─ swooplong.wav
  └─ smash/
      └─ smashhigh.wav
```

```js
s("swoop:0 swoop:1 smash:2")
```

### 5. Local disk — `@strudel/sampler` server

```bash
cd samples
npx @strudel/sampler
# auto-generate strudel.json:
npx --yes @strudel/sampler --json > strudel.json
```

```js
samples('http://localhost:5432/');
n("<0 1 2>").s("swoop smash")
```

### 6. Pitched samples — keyboard mapping

```js
samples({
  'moog': {
    'g2': 'moog/004_Mighty%20Moog%20G2.wav',
    'g3': 'moog/005_Mighty%20Moog%20G3.wav',
    'g4': 'moog/006_Mighty%20Moog%20G4.wav',
  }
}, 'github:tidalcycles/dirt-samples')

note("g2!2 <bb2 c3>!2, <c4@3 [<eb4 bb3> g4 f4]>").s('moog')
```

### 7. Shabda — AI voice + Freesound integration

```js
samples('shabda:bass:4,hihat:4,rimshot:2')
samples('shabda/speech:the_drum,forever')
samples('shabda/speech/fr-FR/m:magnifique')    // lang / gender optional
```

---

## Banks & sample indexing

```js
// Prepends "RolandTR808_" to each name
s("bd sd,hh*16").bank("RolandTR808")

// Patternable banks
s("bd sd,hh*16").bank("<RolandTR808 RolandTR909>")

// Pick the n-th variant of a sound
s("hh*8").bank("RolandTR909").n("0 1 2 3")

// Same as `:n` suffix in mini-notation
s("bd*4,hh:0 hh:1 hh:2 hh:3").bank("RolandTR909")

// Custom alias for a long name
soundAlias('RolandTR808_bd', 'kick')
s("kick")
```

---

## Sample manipulation

| Effect | Purpose |
|---|---|
| `begin` / `end` | Trim sample start/end (0–1) |
| `loop` | Loop sample (NOT tempo-synced) |
| `loopBegin` / `loopEnd` (`loopb` / `loope`) | Define loop region |
| `cut` | Cut group — playing a new one stops the previous |
| `clip` / `legato` | Multiply event duration; cuts at end if exceeded |
| `loopAt` | Stretch sample to fit N cycles (varies speed) |
| `fit` | Stretch sample to fit one event |
| `chop` | Granular: divide sample into N parts and play in order |
| `striate` | Like `chop`, but interleaved across events |
| `slice` | Chop + trigger slices by index pattern |
| `splice` | Like `slice` but rescales speed per slice |
| `scrub` | Move through sample with position/speed control |
| `speed` | Playback speed; negative = reverse |

### Examples (verbatim)

```js
s("bd*2,oh*4").end("<.1 .2 .5 1>").fast(2)

s("casio").loop(1)
s("space").loop(1).loopBegin("<0 .125 .25>")
s("space").loop(1).loopEnd("<1 .75 .5 .25>")

s("[oh hh]*4").cut(1)

note("c a f e").s("piano").clip("<.5 1 2>")

samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes").loopAt(2)
s("rhodes").fit()

s("rhodes").chop(4).rev().loopAt(2)

s("numbers:0 numbers:1 numbers:2").striate(6).slow(3)

samples('github:tidalcycles/dirt-samples')
s("breaks165").slice(8, "0 1 <2 2*2> 3 [4 0] 5 6 7").slow(0.75)
s("breaks165").splice(8, "0 1 [2 3 0]@2 3 0@2 7")

samples('github:switchangel/pad')
s("swpad:0").scrub("{0.1!2 .25@3 0.7!2 <0.8:1.5>}%8")

s("bd*6").speed("1 2 4 1 -2 -4")
speed("1 1.5*2 [2 1.1]").s("piano").clip(1)
```

---

## Gotchas

- **Lazy loading.** Samples load on first play, which can cause initial silence on the first cycle.
- **Cache.** Updated `strudel.json` files may be cached — version-string the URL to force a reload.
- Sample indices are **0-based, alphabetical order**.
- The `sounds` tab lists everything; `user` tab shows your imports.
