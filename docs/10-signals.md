# 10 — Signals

Source: <https://strudel.cc/learn/signals/>

Continuous-time signals — used as modulation sources for any numeric parameter (cutoff, pan, gain, note, …). Plug a signal in where you'd otherwise write a number.

---

## Periodic signals

All output the range **0–1** by default. Append `2` (e.g. `saw2`) for **−1 to 1**.

| Signal | Shape | Example |
|---|---|---|
| `sine` | Sine wave | `n(sine.segment(16).range(0,15)).scale("C:minor")` |
| `cosine` | Cosine (sine shifted by π/2) | `n(stack(sine, cosine).segment(16).range(0,15)).scale("C:minor")` |
| `tri` | Triangle | `n(tri.segment(8).range(0,7)).scale("C:minor")` |
| `saw` | Ramp up 0→1, snap back | `n(saw.range(0,8).segment(8)).scale("C major")` |
| `square` | Square (50% duty) | `n(square.segment(4).range(0,7)).scale("C:minor")` |

`*2` variants: `sine2`, `cosine2`, `tri2`, `saw2`, `square2`, `rand2`.

## Random signals

| Signal | Behavior | Example |
|---|---|---|
| `rand` | Continuous random float 0–1 | `s("bd*4,hh*8").cutoff(rand.range(500,8000))` |
| `perlin` | Smoothed (Perlin-noise) random, 0–1 | `s("bd*4,hh*8").cutoff(perlin.range(500,8000))` |
| `irand(n)` | Continuous random **integer** 0..n−1 | `n(irand(8)).struct("x x*2 x x*3").scale("C:minor")` |
| `brand` | Binary random (0 or 1) | `s("hh*10").pan(brand)` |
| `brandBy(p)` | Binary random with probability `p` of 1 | `s("hh*10").pan(brandBy(0.2))` |

## Input signals

| Signal | Description |
|---|---|
| `mouseX`, `mouseY` | Mouse position normalized 0–1. Live performance control. |

---

## Signal methods

| Method | Purpose |
|---|---|
| `.range(min, max)` | Rescale output to `[min, max]` |
| `.slow(n)` | Stretch signal over n cycles (slower oscillation) |
| `.fast(n)` | Speed up oscillation |
| `.segment(steps)` | Discretize: sample the continuous signal at `steps` points per cycle |

## Mental model

Periodic signals run at **one cycle per cycle** by default. `.slow(4)` gives a sine that takes 4 cycles to complete; `.fast(8)` gives 8 sweeps per cycle. `.segment(n)` turns the continuous curve into n discrete steps — essential when feeding `note()` or `n()` where you want stepped values, not a glissando.

```js
// classic: a slow LFO on the filter
note("c3").s("sawtooth").lpf(sine.range(200, 4000).slow(4))
```
