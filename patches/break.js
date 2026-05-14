// break.js — breakbeat groove + matching bass, A minor, 125 BPM
// Read positions as 16ths across one cycle (1 = downbeat, 5 = beat 2, 9 = beat 3, 13 = beat 4).

stack(
  // kick: 1, "a of 1", "and of 2", "and of 3" — syncopated, no 4-on-floor
  s("bd ~ ~ bd ~ ~ bd ~ ~ ~ bd ~ ~ ~ ~ ~").bank("RolandTR909").gain(0.95),

  // snare on 2 and 4, plus a tiny ghost on the "a of 4"
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ sd").bank("RolandTR909").gain("0.85 0.85 0.85 0.4"),

  // 16th hats with random gain wobble + slow stereo
  s("hh*16").bank("RolandTR909")
    .gain(perlin.range(0.2, 0.55))
    .pan(sine.slow(8)),

  // breakbeat bass — root on 1, sub stabs around the off-beats, octave punch on "a of 4"
  note("a1 ~ ~ ~ ~ ~ a2 ~ a1 ~ ~ ~ ~ ~ a2 ~").s("sawtooth")
    .lpf(900).lpq(7)
    .attack(0.005).release(0.18)
    .gain(0.6)
).cpm(125/4)
