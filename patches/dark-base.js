// dark-base.js — the foundation: just kick + bass for dark progressive house
// A minor, 125 BPM. Three layers: kick / sub / reese mid-bass.

samples({
  bd: ['bd/BT0AADA.wav','bd/BT0A0D0.wav','bd/BT0A0A7.wav'],
}, 'github:tidalcycles/dirt-samples');

// reusable bass voice — detune, snappier envelope (for 16th rolls), heavy saturation
const reese = x => x
  .add(note("0,.04"))
  .s('sawtooth')
  .attack(.001).decay(.09).sustain(.3).release(.05)
  .shape(.6);

stack(
  // ===== KICK — 4OTF, sample round-robin + micro speed jitter for life =====
  s("bd*4").n("<0 1 2 0 2 1 0 2>")
    .speed(perlin.range(.97, 1.03))
    .gain(.9),

  // ===== SUB BASS — sine, pulses with the kick =====
  note("a1*4").s('sine').gain(.7),

  // ===== REESE MID-BASS — breakbeat-flavored 2-bar phrygian, no gaps =====
  // Each beat has either an 8th (single slot) or 16ths (doubled slot).
  // Bar 2 ends with a triplet roll for the breakbeat lift.
  note(`<
    [a1 [a2 a2] a1 a2 [a1 c2] [a2 a2] [a1 bb1] [a2 g1]]
    [a1 [a2 g2] a1 [a2 a2] [a1 f2] [bb1 a2] [a1 c2] [g1 a2]]
  >`).apply(reese)
    .add(note(perlin.range(-.05, .05)))              // micro pitch drift
    .cutoff(sine.slow(32).range(150, 180))           // darker cutoff range
    .resonance(perlin.range(8, 12).slow(8))          // breathing resonance
    .lpa(.02).lpenv(-2.5)                            // deeper per-note filter dip
    .gain("0.6 0.4 0.5 0.4 0.6 0.4 0.5 0.45")
    .mul(gain(perlin.range(.88, 1).slow(4)))         // gentle volume drift
    .sometimesBy(.12, x => x.add(note(-12)))         // 12% chance to drop an octave
    ._scope(),

  // ===== ATMOSPHERIC PLUCK MOTIF =====
  // Sparse descending phrygian phrase in the upper register.
  // Bar 1: e5 → c5 (descending major third).
  // Bar 2: a4 → f4 (descending minor third, ♭3 of A — phrygian color).
  // Sine + light FM (bell-like), dotted-eighth delay (the dark-prog signature),
  // deep room, slight detune, slow stereo wander. Plucked envelope:
  // fast attack, short decay, no sustain — each note rings out via the delay tail.
  note(`<
    [~ ~ e5 ~ ~ ~ c5 ~]
    [~ ~ a4 ~ ~ ~ f4 ~]
  >`)
    .add(note("0,.04"))                              // slight detune for thickness
    .s('sine').fm(2.5).fmh(2.7)                      // FM bell character
    .attack(.002).decay(.1).sustain(0).release(.6)   // plucked envelope
    .lpf(2400).lpa(.005).lpenv(-1)                   // soft filter env
    .room(.85)                                       // long reverb tail
    .delay(.55).delaytime(1.44).delayfeedback(.45)   // 1.44s = 3 beats at 125 BPM (3/4 of a bar)
    .pan(perlin.range(0.25, 0.75).slow(4))           // gentle stereo drift
    .gain(.28),
).cpm(125/4)
