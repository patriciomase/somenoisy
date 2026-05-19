# Gotchas

Things that bite. Skim before submitting any patch.

---

## Tempo

- **Default is `30 cpm`** — one cycle every 2 seconds. Way slower than musicians expect. **Always `setcpm()` explicitly** for anything beyond an ambient sketch.
- `setcpm(BPM/4)` for 4/4 music — a "cycle" is one bar, not one beat.

## Strings — single vs double quotes

- `"…"` is parsed as **mini-notation**.
- `'…'` is a **plain JS string**, not parsed.

So `note("c minor")` tries to make a pattern out of two events `c` and `minor` (breaks). `note('c minor')` is a literal string (also wrong here). For a key, you want `.scale("C:minor")` (colons, not spaces).

## Mini-notation commas

`,` inside a quoted pattern means **parallel stack**, not sequential separator.

- `"bd sd"` — kick then snare.
- `"bd, sd"` — kick AND snare simultaneously.

When mixing them, group with brackets: `"bd [bd, cp] bd cp"`.

## `<>` is one-per-cycle

`"<a b c d>"` plays one item per cycle — so 4 cycles to traverse the list. Putting 8 items in `<>` means 8 cycles before it repeats. Use this for slow evolution, not for fast sequences. For a sequence within one cycle, drop the brackets.

## Sample indices are 0-based and alphabetical

`hh:0` is the **alphabetically first** hi-hat sample in the bank, not "the default one." If you want a specific timbre, listen first and pin the index — don't assume.

## Lazy sample loading

Samples load on first play. The first cycle may be silent. Mention this to the user if they report nothing plays initially — tell them to let it run for a bar or two, or to load via `samples(...)` ahead of time.

## `note()` vs `n()`

- `note("c e g")` — accepts MIDI numbers, letter names with accidentals, and octaves. Direct pitch.
- `n("0 2 4")` — accepts numbers as **scale degrees** (needs `.scale("...")` to be musical) OR sample indices when paired with `.sound(...)`.

Mixing them up is the #1 source of "why does my melody sound random."

## `.fast(n)` vs `*n` in mini-notation

Both speed things up, but:

- `.fast(2)` applies to the **whole** chained pattern.
- `"a b c d*2"` only repeats `d` — `a b c d d`.
- `"[a b c d]*2"` repeats the whole group.

Get the bracketing right.

## `/` slows the *preceding* group

`"a b c d"/2` — the whole pattern takes 2 cycles. `"a b c/2 d"` — only `c` is slow. Mostly an issue when copy-pasting from other examples.

## Delay feedback ≥ 1 = runaway

`.delayfeedback(1)` will pile audio forever and get loud fast. **Cap at 0.9.** Same applies to `.delay("level:time:feedback")` — the third number is feedback.

## Gain stacking

`.gain()` is multiplicative across the chain. Two layers each at `.gain(1)` is hot. Mix bus thinking: kick `.gain(1.0)`, hats `.gain(.5)`, pads `.gain(.4)`.

## `.lpf` without `.lpq` is gentle

A bare `.lpf(800)` is a soft 12 dB/oct slope. For audible filter character (squelch, acid), add `.lpq(8)` or higher. `.ftype(1)` swaps in a ladder model, `.ftype(2)` a 24 dB/oct slope.

## `gm_*` names are samples, not synths

`gm_acoustic_bass`, `gm_synth_strings_1`, etc. are **soundfont samples**. They sound great out of the box but you can't tweak the synthesis parameters (oscillator type, FM, partials). For tweakable synthesis use `sawtooth`, `square`, `sine`, `triangle`, `supersaw`, etc. — see `docs/08-synths.md`.

## `supersaw` at low notes → phantom amplitude peaks

`supersaw` internally stacks several detuned saw oscillators. At very low fundamentals (below ~A2 = 110 Hz), those internal voices produce **constructive amplitude peaks** at note onsets that read as ugly saturation / clicks / "weird interference" — even at safe output gains, even with slow attack, even with the LPF removed. It is **not** output clipping; it is the synth's own intermodulation.

**Symptoms:** clean kicks, but the bass has audible peaks or saturation on every note (worst on the lowest notes). The peaks persist after disabling `.distort`, `.shape`, `.lpf`, `.hpf`, `.resonance`, lowering gain, and slowing attack — all of which would normally fix peakiness.

**Fix:** for bass below A2, use plain `.s("sawtooth")` (single oscillator). Recover supersaw-style thickness with a controlled 2-voice detune layer:

```js
note("a1*4")
  .s("sawtooth")
  .add(note("0,.04"))    // two saws, ~4 cents apart — wide without the peaks
  .lpf(380).distort(1.2)
```

**Rule of thumb:** `supersaw` shines for chord stabs, leads, pads — anywhere in the mid-to-high register. For bass below ~A2 (110 Hz), prefer single `sawtooth` with optional manual detune. Discovered the hard way via a 9-step bisect in `patches/dark-techno.js` on 2026-05-17.

## `degrade` vs `sometimes`

- `.degrade()` **removes** events.
- `.sometimes(fn)` **transforms** events.

They compose freely. Don't reach for `sometimes(x => x.gain(0))` when you want degrade.

## Browser sample cache

If loading custom `strudel.json` from a URL and changes don't appear, the browser is caching. Bust with `?version=2` (or any query string change).

## Tonal scales — `:`, not space

`scale("C major")` — wrong, won't parse. `scale("C:major")` — right. Same for octave: `scale("C4:minor")`.

## REPL shortcuts (uncommitted; verify from the editor)

- `Ctrl/Cmd + Enter` — evaluate the buffer.
- `Ctrl/Cmd + .` — silence/stop.
- `Ctrl/Cmd + /` — toggle comments.

(Strudel's docs don't formally list these; the REPL UI does.)
