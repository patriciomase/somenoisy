# 07 — Effects reference (deep)

Source: <https://strudel.cc/learn/effects/>

The complete effects/controls reference. Supersedes the workshop intro in `03-first-effects.md` — that doc is the gentle entry point, this is the full catalog.

> Every effect is method-chained onto a pattern: `pattern.eff1(x).eff2(y)`. Most parameters accept either a constant **or** a pattern/signal.

---

## Filters

| Effect | Aliases | Range / Format | Example |
|---|---|---|---|
| `lpf` (low-pass) | `cutoff`, `ctf`, `lp` | 0–20000 Hz | `s("bd sd").lpf("<4000 2000 1000 500 200 100>")` |
| `lpq` (LP resonance) | `resonance` | 0–50 | `s("bd sd").lpf(2000).lpq("<0 10 20 30>")` |
| `hpf` (high-pass) | `hp`, `hcutoff` | 0–20000 Hz | `s("bd sd").hpf("<4000 2000 1000 500 200 100>")` |
| `hpq` | `hresonance` | 0–50 | `s("bd sd").hpf(2000).hpq("<0 10 20 30>")` |
| `bpf` (band-pass) | `bandf`, `bp` | Hz (center) | `s("bd sd").bpf("<1000 2000 4000 8000>")` |
| `bpq` | `bandq` | q factor | `s("bd sd").bpf(500).bpq("<0 1 2 3>")` |
| `ftype` (filter type) | — | 0 (12dB), 1 (ladder), 2 (24dB) | `note("{f g g c}").s("sawtooth").lpf(500).ftype("<0 1 2>")` |
| `vowel` | — | `a e i o u ae aa oe ue y uh un en an on` | `note("[c2 eb2]").s("sawtooth").vowel("<a e i <o u>>")` |

---

## Tremolo (amplitude modulation)

| Effect | Aliases | Parameter | Example |
|---|---|---|---|
| `tremolosync` | `tremsync` | cycles | `note("d d d# d").s("supersaw").tremolosync("4")` |
| `tremolodepth` | `tremdepth` | depth | `note("a1 a1").s("pulse").tremsync(4).tremolodepth("<1 2 .7>")` |
| `tremoloskew` | `tremskew` | 0–1 | `note("{f a c e}").s("sawtooth").tremsync(4).tremoloskew("<.5 0 1>")` |
| `tremolophase` | `tremphase` | cycles offset | `note("{f a c e}").s("sawtooth").tremsync(4).tremolophase("<0 .25 .66>")` |
| `tremoloshape` | `tremshape` | `tri square sine saw ramp` | `note("{f g c d}").tremsync(4).tremoloshape("<sine tri square>")` |

---

## ADSR (amplitude envelope)

| Effect | Aliases | Parameter | Example |
|---|---|---|---|
| `attack` | `att` | seconds | `note("c3 e3 f3 g3").attack("<0 .1 .5>")` |
| `decay` | `dec` | seconds | `note("c3 e3 f3 g3").decay("<.1 .2 .3 .4>")` |
| `sustain` | `sus` | 0–1 | `note("c3 e3 f3 g3").decay(.2).sustain("<0 .1 .4 .6 1>")` |
| `release` | `rel` | seconds | `note("c3 e3 g3 c4").release("<0 .1 .4 .6 1>/2")` |
| `adsr` | — | `"a:d:s:r"` | `note("[c3 bb2 f3 eb3]").s("sawtooth").adsr(".1:.1:.5:.2")` |

---

## Filter envelope (LP shown — `hp*` and `bp*` analogous)

| Effect | Aliases | Example |
|---|---|---|
| `lpattack` | `lpa` | `note("c2 e2 f2 g2").s("sawtooth").lpf(300).lpa("<.5 .25 .1 .01>/4")` |
| `lpdecay` | `lpd` | `note("c2 e2 f2 g2").s("sawtooth").lpf(300).lpd("<.5 .25 .1 0>/4")` |
| `lpsustain` | `lps` | `note("c2 e2 f2 g2").s("sawtooth").lpf(300).lps("<0 .25 .5 1>/4")` |
| `lprelease` | `lpr` | `note("c2 e2 f2 g2").s("sawtooth").lpf(300).lpr("<.5 .25 .1 0>/4")` |
| `lpenv` (depth) | `lpe` | `note("c2 e2 f2 g2").s("sawtooth").lpf(300).lpenv("<4 2 1 0 -1 -2 -4>/4")` |

---

## Pitch envelope

| Effect | Aliases | Parameter | Example |
|---|---|---|---|
| `pattack` | `patt` | seconds | `note("c eb g bb").pattack("0 .1 .25 .5")` |
| `pdecay` | `pdec` | seconds | `note("<c eb g bb>").pdecay("<0 .1 .25 .5>")` |
| `prelease` | `prel` | seconds | `note("<c eb g bb> ~").release(.5).prelease("<0 .1 .25 .5>")` |
| `penv` (depth) | — | semitones (neg flips) | `note("c").penv("<12 7 1 .5 0 -1 -7 -12>")` |
| `pcurve` | — | 0 linear, 1 exp | `note("g1").s("sine").pdec(.5).penv(32).pcurve("<0 1>")` |
| `panchor` | — | 0 ascend, 1 descend | `note("c c4").penv(12).panchor("<0 .5 1 .5>")` |

---

## Dynamics

| Effect | Format | Example |
|---|---|---|
| `gain` | 0–1 | `s("hh*8").gain(".4!2 1 .4!2 1 .4 1")` |
| `velocity` / `vel` | 0–1 | `s("hh*8").gain(".4!2 1 .4!2 1 .4 1").velocity(".4 1")` |
| `compressor` | `"threshold:ratio:knee:attack:release"` | `s("bd sd").compressor("-20:20:10:.002:.02")` |
| `postgain` | scalar | `s("bd sd").compressor("-20:20:10:.002:.02").postgain(1.5)` |
| `xfade` | 0–1 between two patterns | `xfade(s("bd*2"), "<0 .25 .5 .75 1>", s("hh*8"))` |

---

## Stereo / panning

| Effect | Parameter | Example |
|---|---|---|
| `pan` | 0 (L) – 1 (R) | `s("[bd hh]*2").pan("<.5 1 .5 0>")` |
| `jux(fn)` | function applied to right channel only | `s("bd lt [~ ht]").jux(rev)` |
| `juxBy(width, fn)` | 0–1 width control | `s("bd lt [~ ht]").juxBy("<0 .5 1>/2", rev)` |

---

## Waveshaping / distortion

| Effect | Parameter | Example |
|---|---|---|
| `coarse` | factor (1=orig, 2=half, …) | `s("bd sd").coarse("<1 4 8 16 32>")` |
| `crush` | 1–16 (bit depth) | `s("<bd sd>,hh*3").crush("<16 8 7 6 5 4 3 2>")` |
| `distort` / `dist` | `"amount:postgain:type"` | `s("bd sd").distort("<0 2 3 10:.5>")` |

---

## Delay

| Effect | Aliases | Parameter | Example |
|---|---|---|---|
| `delay` | — | level 0–1, or `"level:time:feedback"` | `s("bd bd").delay("<0 .25 .5 1>")` |
| `delaytime` | `delayt`, `dt` | seconds | `note("d d a# a").delay(.8).delaytime(1/2)` |
| `delayfeedback` | `delayfb`, `dfb` | 0–1 (≥1 = runaway) | `s("bd").delay(.25).delayfeedback("<.25 .5 .75 1>")` |

---

## Reverb

| Effect | Aliases | Parameter | Example |
|---|---|---|---|
| `room` | — | 0–1, or `"level:size"` | `s("bd sd").room("<0 .2 .4 .6 .8 1>")` |
| `roomsize` | `rsize`, `sz`, `size` | 0–10 | `s("bd sd").room(.8).rsize(1)` |
| `roomfade` | `rfade` | seconds | `s("bd sd").room(0.5).rlp(10000).rfade(0.5)` |
| `roomlp` | `rlp` | Hz | `s("bd sd").room(0.5).rlp(10000)` |
| `roomdim` | `rdim` | Hz @ –60dB | `s("bd sd").room(0.5).rlp(10000).rdim(8000)` |
| `iresponse` | `ir` | sample name | `s("bd sd").room(.8).ir("<shaker_large:0 shaker_large:2>")` |

---

## Phaser

| Effect | Aliases | Parameter | Example |
|---|---|---|---|
| `phaser` | `ph` | speed | `n(run(8)).s("sawtooth").phaser("<1 2 4 8>")` |
| `phaserdepth` | `phd` | 0–1 (default .75) | `n(run(8)).s("sawtooth").phaser(2).phaserdepth("<0 .5 .75 1>")` |
| `phasercenter` | `phc` | Hz (default 1000) | `n(run(8)).s("sawtooth").phaser(2).phasercenter("<800 2000 4000>")` |
| `phasersweep` | `phs` | typ. 0–4000 | `n(run(8)).s("sawtooth").phaser(2).phasersweep("<800 2000 4000>")` |

---

## Sidechain / ducking

| Effect | Aliases | Parameter | Example |
|---|---|---|---|
| `duckorbit` | `duck` | target orbit (`:`-list for multiple) | `s("bd").duckorbit(2).duckattack(0.2).duckdepth(1)` |
| `duckattack` | `duckatt`, `datt` | seconds | `s("bd").duckorbit(2).duckattack("<0.2 0 0.4>")` |
| `duckdepth` | — | 0–1 | `s("bd").duckorbit(2).duckdepth("<1 .9 .6 0>")` |

---

## Routing

| Effect | Aliases | Purpose | Example |
|---|---|---|---|
| `orbit` | `o` | Group patterns onto shared effect bus | `s("hh*6").delay(.5).orbit(1)` |
